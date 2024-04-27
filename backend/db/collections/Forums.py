from db.collections.BaseCollection import BaseCollection
from db.collections.SharedConfig import Config, Collection


class Forums(BaseCollection):

    collection = Collection.FORUMS

    joins = {
        "posts": [
            {"$lookup": {
                "from": Config.get_name(Collection.POSTS),
                "localField": "_id",
                "foreignField": "forum_id",
                "pipeline": [
                    {"$match": {"deleted": 0}},
                    {"$addFields": {"_id": {"$toString": "$_id"}}}
                ],
                "as": "posts"
            }}
        ]
    }
