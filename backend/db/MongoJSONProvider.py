from flask.json.provider import DefaultJSONProvider
from bson.objectid import ObjectId
from db.collections.BaseCollection import BaseCollection


class MongoJSONProvider(DefaultJSONProvider):

    def __init__(self, app):
        super().__init__(app)

    def default(self, obj):
        if isinstance(obj, BaseCollection):
            return obj.to_document()
        elif isinstance(obj, ObjectId):
            return str(obj)
        elif isinstance(obj, bytes):
            return obj.decode('utf-8')
        return super().default(obj)
