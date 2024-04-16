from db.collections.BaseCollection import BaseCollection
from db.collections.Users import Users


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
                    {"$addFields": {"_id": {"$toString": "$_id"}}}
                ],
                "as": "user"
            }},
            {"$set": {"user": {"$first": "$user"}}}
        ]
    }
