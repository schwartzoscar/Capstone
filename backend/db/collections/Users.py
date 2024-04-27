from time import time
import bcrypt
from flask_jwt_extended import get_jwt_identity
from db.collections.BaseCollection import BaseCollection
from db.collections.SharedConfig import Collection
from services.S3 import S3


class Users(BaseCollection):

    collection = Collection.USERS
    visitor_fields = {"username": 1, "email": 1, "profile_img": 1, "created_at": 1}

    @staticmethod
    def get_current_user(raw=False):
        user_id = get_jwt_identity()
        return Users.find_by_id(user_id, raw=raw) if user_id else False

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

    def update_password(self, password, confirm):
        if not password:
            return {"password": "Password cannot be empty."}
        if password != confirm:
            return {"confirm": "Passwords do not match."}
        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        self.update({"password": hashed})
        return False
