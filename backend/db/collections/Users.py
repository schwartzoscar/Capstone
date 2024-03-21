from db.collections.BaseCollection import BaseCollection
from services.S3 import S3


class Users(BaseCollection):

    collection_name = "users"

    @staticmethod
    def register(username, email, password):
        user = Users({'username': username, 'email': email, 'password': password})
        resp = user.save()
        if resp.inserted_id:
            return Users.find_by_id(resp.inserted_id)
        return False

    # TODO just a test method, will be re-done in profile ticket
    def update_profile_img(self):
        with open('db/collections/s3test.jpg', 'rb') as data:
            filename = f'profile-images/{self._id}/s3test.jpg'
            S3.upload(filename, data)
            self.update({"profile_img": filename})
