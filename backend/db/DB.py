import pymongo
import os


class DB:

    instance = None

    def __init__(self):
        pass

    @staticmethod
    def initialize():
        client = pymongo.MongoClient(
            host=os.getenv('MONGODB_HOST'),
            username=os.getenv('MONGODB_USERNAME'),
            password=os.getenv('MONGODB_PASSWORD'),
            port=27017,
            authSource=os.getenv('MONGODB_AUTH_SOURCE')
        )
        DB.instance = client[os.getenv('MONGODB_NAME')]
        # TODO run migrations
