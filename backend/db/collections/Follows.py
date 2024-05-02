from bson.objectid import ObjectId
from db.DB import DB
from db.collections.SharedConfig import Collection
from db.collections.Users import Users

class Follows:
    collection_name = 'follows'

    @staticmethod
    def get_db_instance():
        if DB.instance is None:
            DB.initialize()
        return DB.instance

    @staticmethod
    def follow(follower_id, following_id):
        try:
            db_instance = Follows.get_db_instance()
            
            # Check if the user is already being followed
            existing_follow = db_instance[Follows.collection_name].find_one({
                "follower": ObjectId(follower_id),
                "following": ObjectId(following_id)
            })
            
            if existing_follow:
                raise Exception("User is already being followed")
            
            follow_doc = {
                "follower": ObjectId(follower_id),
                "following": ObjectId(following_id)
            }
            db_instance[Follows.collection_name].insert_one(follow_doc)
        except Exception as e:
            print(f"Error occurred while following: {str(e)}")

    @staticmethod
    def unfollow(follower_id, following_id):
        try:
            db_instance = Follows.get_db_instance()
            db_instance[Follows.collection_name].delete_one({
                "follower": ObjectId(follower_id),
                "following": ObjectId(following_id)
            })
        except Exception as e:
            print(f"Error occurred while unfollowing: {str(e)}")

    @staticmethod
    def get_stats(user_id):
        try:
            db_instance = Follows.get_db_instance()
            followers_count = db_instance[Follows.collection_name].count_documents({"following": ObjectId(user_id)})
            following_count = db_instance[Follows.collection_name].count_documents({"follower": ObjectId(user_id)})
            return {"followers_count": followers_count, "following_count": following_count}
        except Exception as e:
            print(f"Error occurred while getting stats: {str(e)}")
            return {"followers_count": 0, "following_count": 0}

    @staticmethod
    def get_following_users(user_id):
        try:
            db_instance = Follows.get_db_instance()
            follow_docs = db_instance[Follows.collection_name].find({"follower": ObjectId(user_id)})
            following_ids = [doc['following'] for doc in follow_docs]
            
            if following_ids:
                following_users = db_instance[Users.collection_name].find({"_id": {"$in": following_ids}})
                return list(following_users)
            else:
                return []
            
        except Exception as e:
            print(f"Error Occoured while getting followed- {str(e)}")
            return [] 