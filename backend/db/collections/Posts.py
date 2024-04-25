from time import time
from db.collections.BaseCollection import BaseCollection
from db.collections.SharedConfig import Config, Collection
from services.S3 import S3


class Posts(BaseCollection):

    collection_name = Config.get_name(Collection.POSTS)

    joins = {
        "users": [
            {"$lookup": {
                "from": Config.get_name(Collection.USERS),
                "localField": "user_id",
                "foreignField": "_id",
                "pipeline": [
                    {"$match": {"deleted": 0}},
                    {"$project": Config.get_def_fields(Collection.USERS)},
                    {"$addFields": {"_id": {"$toString": "$_id"}}}
                ],
                "as": "user"
            }},
            {"$set": {"user": {"$first": "$user"}}}
        ],
        "forums": [
            {"$lookup": {
                "from": Config.get_name(Collection.FORUMS),
                "localField": "forum_id",
                "foreignField": "_id",
                "pipeline": [
                    {"$match": {"deleted": 0}},
                    {"$addFields": {"_id": {"$toString": "$_id"}}}
                ],
                "as": "forum"
            }},
            {"$set": {"forum": {"$first": "$forum"}}}
        ]
    }

    @staticmethod
    def upload_image(user_id, image_blob):
        timestamp = time()
        filename = f'post-images/{user_id}/{timestamp}.jpg'
        S3.upload(filename, image_blob)
        return filename
