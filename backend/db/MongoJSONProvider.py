from flask.json.provider import DefaultJSONProvider
from db.collections.BaseCollection import BaseCollection


class MongoJSONProvider(DefaultJSONProvider):

    def __init__(self, app):
        super().__init__(app)

    def default(self, obj):
        if isinstance(obj, BaseCollection):
            return obj.to_json()
        return super().default(obj)
