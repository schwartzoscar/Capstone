from time import time
from flask_jwt_extended import get_jwt_identity
from db.collections.BaseCollection import BaseCollection
from services.S3 import S3


class Users(BaseCollection):

    collection_name = "users"

    @staticmethod
    def get_current_user():
        user_id = get_jwt_identity()
        return Users.find_by_id(user_id) if user_id else False

    @staticmethod
    def register(username, email, password):
        user = Users({'username': username, 'email': email, 'password': password})
        resp = user.save()
        if resp.inserted_id:
            return Users.find_by_id(resp.inserted_id)
        return False

    def update_profile_img(self, image_blob):
        timestamp = time()
        filename = f'profile-images/{self._id}/{timestamp}.jpg'
        S3.upload(filename, image_blob)
        self.update({"profile_img": filename})
