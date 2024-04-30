from time import time
from db.collections.BaseCollection import BaseCollection
from db.collections.SharedConfig import Config, Collection
from services.S3 import S3


class Posts(BaseCollection):

    collection = Collection.POSTS

    joins = {
        "users": [
            {"$lookup": {
                "from": Config.get_name(Collection.USERS),
                "localField": "user_id",
                "foreignField": "_id",
                "pipeline": [
                    {"$match": {"deleted": 0}},
                    {"$project": Config.get_def_fields(Collection.USERS)}
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
                    {"$lookup": {
                        "from": Config.get_name(Collection.USERS),
                        "localField": "users._id",
                        "foreignField": "_id",
                        "pipeline": [
                            {"$match": {"deleted": 0}},
                            {"$project": Config.get_def_fields(Collection.USERS)}
                        ],
                        "as": "userData"
                    }},
                    {"$addFields": {"users": {"$map": {
                        "input": "$users",
                        "as": "user",
                        "in": {
                            "$mergeObjects": [
                                "$$user",
                                {"$arrayElemAt": ["$userData", {"$indexOfArray": ["$userData._id", "$$user._id"]}]}
                            ]
                        }
                    }}}},
                    {"$unset": "userData"}
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
