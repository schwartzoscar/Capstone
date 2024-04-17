from time import time
from flask_jwt_extended import get_jwt_identity
from db.collections.BaseCollection import BaseCollection
from services.S3 import S3


class Users(BaseCollection):

    collection_name = "users"
    def_fields = {"username": 1, 'email': 1, "profile_img": 1, "created_at": 1}
    visitor_fields = {"username": 1, "email": 1, "profile_img": 1, "created_at": 1}

    @staticmethod
    def get_current_user():
        user_id = get_jwt_identity()
        return Users.find_by_id(user_id) if user_id else False

    @staticmethod
    def register(username, email, password):
        user = Users({'username': username, 'email': email, 'password': password})
        resp = user.save()
        if resp.inserted_id:
            return Users.find_by_id(resp.inserted_id, projection=Users.def_fields)
        return False

    def update_profile_img(self, image_blob):
        timestamp = time()
        filename = f'profile-images/{self._id}/{timestamp}.jpg'
        S3.upload(filename, image_blob)
        self.update({"profile_img": filename})

    def update_password(self, password, confirm):
        if not password:
            return {"password": "Password cannot be empty."}
        if password != confirm:
            return {"confirm": "Passwords do not match."}
        self.update({"password": password})
        return False
