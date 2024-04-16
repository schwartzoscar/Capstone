import pymongo
import os
import bcrypt
from bson.binary import Binary

from collections.Users import users

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
            authSource="admin"
        )
        print("Connected to MongoDB.")
        DB.instance = client[os.environ['MONGODB_NAME']]
        print("Using database:", os.environ['MONGODB_NAME'])
        # TODO run migrations

        # Update exisiting records to store hased passwords
        collection = DB.instance[users.collection_name]
        for users in collection.find():
            if 'password' in users and isinstance(users['password'], str):
                hashed_password = bcrypt.hashpw(users['password'].encode('utf-8'), bcrypt.gensalt())
                users.update_one({'_id': users['_id']}, {'$set': {'password': hashed_password}})