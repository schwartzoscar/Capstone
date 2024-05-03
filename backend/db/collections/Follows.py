from bson.objectid import ObjectId
from db.DB import DB
from db.collections.SharedConfig import Collection

class Follows:
    collection = Collection.FOLLOWS

    @staticmethod
    def get_db_instance():
        if DB.instance is None:
            DB.initialize()
        return DB.instance

    @staticmethod
    def follow(follower_id, following_id):
        db_instance = Follows.get_db_instance()
        follow_doc = {
            "follower": ObjectId(follower_id),
            "following": ObjectId(following_id)
        }
        db_instance[Follows.collection].insert_one(follow_doc)

    @staticmethod
    def get_stats(user_id):
        db_instance = Follows.get_db_instance()
        uid = ObjectId(user_id)
        stats = db_instance[Follows.collection].aggregate([
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
