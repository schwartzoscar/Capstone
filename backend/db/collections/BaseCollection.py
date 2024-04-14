from abc import ABC
from pymongo import DESCENDING, ASCENDING
from bson.objectid import ObjectId
from datetime import datetime
from db.DB import DB


class BaseCollection(ABC):

    def __init__(self, fields={}):
        self._id = fields.pop("_id", None)
        self.created_at = fields.pop("created_at", None)
        self.updated_at = fields.pop("updated_at", None)
        self.deleted = fields.pop("deleted", 0)
        self.fields = fields
        self.to_update = {}

    @classmethod
    def find(cls, query={}, projection={}, sort={}, raw=False):
        full_query = {"$and": [{"deleted": 0}, query]}
        res = DB.instance[cls.collection_name].find(full_query, projection, sort=sort)
        return list(res) if raw else list(map(lambda d: cls(d), res))

    @classmethod
    def count(cls, query={}):
        full_query = {"$and": [{"deleted": 0}, query]}
        res = DB.instance[cls.collection_name].count_documents(full_query)
        return res

    @classmethod
    def find_one(cls, query={}, projection={}, sort={}, raw=False):
        full_query = {"$and": [{"deleted": 0}, query]}
        res = DB.instance[cls.collection_name].find_one(full_query, projection, sort=sort)
        if not res:
            return False
        return res if raw else cls(res)

    @classmethod
    def find_by_id(cls, id, projection={}, raw=False):
        return cls.find_one({"_id": ObjectId(id)}, projection=projection, raw=raw)

    @classmethod
    def find_last(cls, projection={}, raw=False):
        return cls.find_one(projection=projection, sort={'_id': DESCENDING}, raw=raw)

    @classmethod
    def aggregate(cls, pipeline=[], raw=False):
        full_pipeline = [
            {"$match": {"deleted": 0}},
            *pipeline
        ]
        res = DB.instance[cls.collection_name].aggregate(full_pipeline)
        return list(res)[0] if raw else list(map(lambda d: cls(d), res))

    @classmethod
    def find_paginated(cls, last_id="0", query={}, projection=None, oldest_first=False, limit=25):
        pipeline = [
            {"$match": {"$and": [{"deleted": 0}, query]}},
            {"$facet": {
                "metadata": [{"$count": "total"}],
                "data": [
                    {"$sort": {"_id": DESCENDING if not oldest_first else ASCENDING}},
                    {"$limit": limit},
                    {"$addFields": {"_id": {"$toString": "$_id"}, "user_id": {"$toString": "$user_id"}}}
                ]
            }}
        ]
        if last_id != "0":
            oid = ObjectId(last_id)
            check = {"$lt": oid} if not oldest_first else {"$gt": oid}
            pipeline[1]["$facet"]["data"].insert(0, {"$match": {"_id": check}})
        if projection:
            pipeline[1]["$facet"]["data"].append({"$project": projection})
        results = list(DB.instance[cls.collection_name].aggregate(pipeline))[0]
        resp = {"data": results['data'], "total": 0}
        if len(results['metadata']) > 0:
            resp['total'] = results['metadata'][0]['total']
        return resp

    @classmethod
    def update_many(cls, query={}, updates={}):
        full_query = {"$and": [{"deleted": 0}, query]}
        update_obj = {"$set": {**updates, "updated_at": datetime.now()}}
        return DB.instance[cls.collection_name].update_many(full_query, update_obj)

    def update(self, updates):
        self.to_update = {**self.to_update, **updates}

    def has_updates(self):
        return len(self.to_update) > 0

    def delete(self):
        self.update({"deleted": 1})

    def save(self):
        coll = DB.instance[self.collection_name]
        now = datetime.now()
        if self._id:
            self.to_update["updated_at"] = now
            return coll.update_one({"_id": self._id}, {"$set": self.to_update})
        else:
            self.created_at = now
            self.updated_at = now
            return coll.insert_one(self.to_json())

    def to_json(self):
        data = {
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "deleted": self.deleted,
            **self.fields
        }
        if self._id:
            data["_id"] = str(self._id)
        return data
