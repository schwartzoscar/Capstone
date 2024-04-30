from flask import Blueprint, jsonify, request
from db.collections.Users import Users
from bson import ObjectId

users_bp = Blueprint("users_bp", __name__)

@users_bp.post('/get')
def get_users():
    data = request.get_json()
    users = Users.find(data, raw=True)
    user_list = []
    for user in users:
        user_list.append({
            "_id": str(user['_id']),
            "username": user['username'],
            "email": user['email']
        })
    return {"message": "OK", "users": user_list}
