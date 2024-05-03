import pymongo
import os
import bcrypt
from bson.binary import Binary


class DB:

    instance = None

    def __init__(self):
        pass

    @staticmethod
    def initialize():
        print("Initializing database...")
        client = pymongo.MongoClient(
            host=os.environ['MONGODB_HOST'],
            username=os.environ['MONGODB_USERNAME'],
            password=os.environ['MONGODB_PASSWORD'],
            port=27017,
            authSource=os.getenv('MONGODB_AUTH_SOURCE')
        )
        print("Connected to MongoDB.")
        DB.instance = client[os.environ['MONGODB_NAME']]
        print("Using database:", os.environ['MONGODB_NAME'])
