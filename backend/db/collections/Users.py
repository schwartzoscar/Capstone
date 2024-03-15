from db.DB import DB
from db.collections.BaseCollection import BaseCollection


class Users(BaseCollection):

    collection_name = "users"

    @staticmethod
    def register(username, email, password):
        user = Users({'username': username, 'email': email, 'password': password})
        resp = user.save()
        if resp.inserted_id:
            return Users.find_by_id(resp.inserted_id)
        return False

    # TODO remove this later
    @staticmethod
    def clear_users():
        DB.instance[Users.collection_name].delete_many({})
