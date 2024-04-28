from time import time
from services.S3 import S3
from db.collections.BaseCollection import BaseCollection
from db.collections.SharedConfig import Config, Collection


class Forums(BaseCollection):

    collection = Collection.FORUMS

    @staticmethod
    def upload_temp(image_blob, user_id, img_type):
        timestamp = time()
        filename = f'forum-images/{img_type}/temp/{user_id}/{timestamp}.jpg'
        S3.upload(filename, image_blob)
        return filename

    @staticmethod
    def upload_temp_profile(image_blob, user_id):
        return Forums.upload_temp(image_blob, user_id, 'profile')

    @staticmethod
    def upload_temp_banner(image_blob, user_id):
        return Forums.upload_temp(image_blob, user_id, 'banner')
