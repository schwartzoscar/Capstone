from bson.objectid import ObjectId
from db.collections.BaseCollection import BaseCollection
from db.collections.SharedConfig import Collection


class Follows(BaseCollection):

    collection = Collection.FOLLOWS

    @staticmethod
    def get_stats(user_id):
        uid = ObjectId(user_id)
        stats = Follows.aggregate([
            {"$facet": {
                "following": [
                    {"$match": {"follower": uid}},
                    {"$count": "total"}
                ],
                "followers": [
                    {"$match": {"following": uid}},
                    {"$count": "total"}
                ]
            }}
        ], raw=True)
        stats = stats[0]
        following = stats['following'][0]['total'] if len(stats['following']) > 0 else 0
        followers = stats['followers'][0]['total'] if len(stats['followers']) > 0 else 0
        return {"following": following, "followers": followers}
