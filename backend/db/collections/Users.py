from db.DB import DB
from db.collections.BaseCollection import BaseCollection


class Users(BaseCollection):

    collection_name = "users"

    @staticmethod
    def register(username, email, password):
        user = Users({'username': username, 'email': email, 'password': password})
        user.save()

    # TODO remove this later
    @staticmethod
    def clear_users():
        DB.instance[Users.collection_name].delete_many({})
