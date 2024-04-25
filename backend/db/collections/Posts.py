from time import time
from db.collections.BaseCollection import BaseCollection
from db.collections.Users import Users
from services.S3 import S3


class Posts(BaseCollection):

    collection_name = "posts"

    joins = {
        "users": [
            {"$lookup": {
                "from": Users.collection_name,
                "localField": "user_id",
                "foreignField": "_id",
                "pipeline": [
                    {"$match": {"deleted": 0}},
                    {"$project": Users.def_fields},
                    {"$addFields": {"_id": {"$toString": "$_id"}}}
                ],
                "as": "user"
            }},
            {"$set": {"user": {"$first": "$user"}}}
        ]
    }

    @staticmethod
    def upload_image(user_id, image_blob):
        timestamp = time()
        filename = f'post-images/{user_id}/{timestamp}.jpg'
        S3.upload(filename, image_blob)
        return filename
