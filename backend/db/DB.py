import pymongo
import os


class DB:

    instance = None

    def __init__(self):
        pass

    @staticmethod
    def initialize():
        client = pymongo.MongoClient(
            host=os.environ['MONGODB_HOST'],
            username=os.environ['MONGODB_USERNAME'],
            password=os.environ['MONGODB_PASSWORD'],
            port=27017,
            authSource="admin"
        )
        DB.instance = client[os.environ['MONGODB_NAME']]
        # TODO run migrations
