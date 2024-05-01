from abc import ABC
from pymongo import DESCENDING, ASCENDING
from bson.objectid import ObjectId
from datetime import datetime
from db.DB import DB
from db.collections.SharedConfig import Config


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
        projection = projection if len(projection) else Config.get_def_fields(cls.collection)
        coll_name = Config.get_name(cls.collection)
        res = DB.instance[coll_name].find(full_query, projection, sort=sort)
        return list(res) if raw else list(map(lambda d: cls(d), res))

    @classmethod
    def count(cls, query={}):
        full_query = {"$and": [{"deleted": 0}, query]}
        coll_name = Config.get_name(cls.collection)
        res = DB.instance[coll_name].count_documents(full_query)
        return res

    @classmethod
    def find_one(cls, query={}, projection={}, sort={}, raw=False):
        full_query = {"$and": [{"deleted": 0}, query]}
        projection = projection if len(projection) else Config.get_def_fields(cls.collection)
        coll_name = Config.get_name(cls.collection)
        res = DB.instance[coll_name].find_one(full_query, projection, sort=sort)
        if not res:
            return False
        return res if raw else cls(res)

    @classmethod
    def find_by_id(cls, id, projection={}, raw=False):
        clean = id if isinstance(id, ObjectId) else ObjectId(id)
        return cls.find_one({"_id": clean}, projection=projection, raw=raw)

    @classmethod
    def find_last(cls, projection={}, raw=False):
        return cls.find_one(projection=projection, sort={'_id': DESCENDING}, raw=raw)

    @classmethod
    def aggregate(cls, pipeline=[], joins=[], raw=False):
        full_pipeline = [
            {"$match": {"deleted": 0}},
            *joins,
            *pipeline
        ]
        coll_name = Config.get_name(cls.collection)
        res = DB.instance[coll_name].aggregate(full_pipeline)
        return list(res) if raw else list(map(lambda d: cls(d), res))

    @classmethod
    def find_paginated(cls, last_id="0", query={}, joins=[], projection={}, oldest_first=False, limit=25):
        pipeline = [
            {"$match": {"$and": [{"deleted": 0}, query]}},
            *joins,
            {"$facet": {
                "metadata": [{"$count": "total"}],
                "data": [
                    {"$sort": {"_id": DESCENDING if not oldest_first else ASCENDING}},
                    {"$limit": limit}
                ]
            }}
        ]
        if last_id != "0":
            oid = ObjectId(last_id)
            check = {"$lt": oid} if not oldest_first else {"$gt": oid}
            pipeline[1]["$facet"]["data"].insert(0, {"$match": {"_id": check}})
        projection = projection if len(projection) else Config.get_def_fields(cls.collection)
        if len(projection):
            pipeline[1]["$facet"]["data"].append({"$project": projection})
        coll_name = Config.get_name(cls.collection)
        results = list(DB.instance[coll_name].aggregate(pipeline))[0]
        resp = {"data": results['data'], "total": 0}
        if len(results['metadata']) > 0:
            resp['total'] = results['metadata'][0]['total']
        return resp

    @classmethod
    def update_many(cls, query={}, updates={}):
        full_query = {"$and": [{"deleted": 0}, query]}
        update_obj = {"$set": {**updates, "updated_at": datetime.now()}}
        coll_name = Config.get_name(cls.collection)
        return DB.instance[coll_name].update_many(full_query, update_obj)

    def update(self, updates):
        self.to_update = {**self.to_update, **updates}

    def has_updates(self):
        return len(self.to_update) > 0

    def delete(self):
        self.update({"deleted": 1})

    def save(self):
        coll = DB.instance[Config.get_name(self.collection)]
        now = datetime.now()
        if self._id:
            self.to_update["updated_at"] = now
            return coll.update_one({"_id": self._id}, {"$set": self.to_update})
        else:
            self.created_at = now
            self.updated_at = now
            return coll.insert_one(self.to_document())

    def to_document(self):
        doc = {
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "deleted": self.deleted,
            **self.fields
        }
        if self._id:
            doc["_id"] = self._id
        return doc
