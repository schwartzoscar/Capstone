from abc import ABC
import pymongo
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
    def find(cls, query={}, projection={}, sort={}):
        full_query = {"$and": [{"deleted": 0}, query]}
        res = DB.instance[cls.collection_name].find(full_query, projection, sort=sort)
        return list(map(lambda d: cls(d), res))

    @classmethod
    def find_one(cls, query={}, projection={}, sort={}):
        full_query = {"$and": [{"deleted": 0}, query]}
        res = DB.instance[cls.collection_name].find_one(full_query, projection, sort=sort)
        if not res:
            return False
        return cls(res)

    @classmethod
    def find_by_id(cls, id, projection={}):
        return cls.find_one({"_id": ObjectId(id)}, projection)

    @classmethod
    def find_last(cls):
        return cls.find_one(sort=[('_id', pymongo.DESCENDING)])

    @classmethod
    def update_many(cls, query={}, updates={}):
        full_query = {"$and": [{"deleted": 0}, query]}
        update_obj = {"$set": {**updates, "updated_at": datetime.now()}}
        return DB.instance[cls.collection_name].update_many(full_query, update_obj)

    def update(self, updates):
        self.to_update = {**self.to_update, **updates}

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
