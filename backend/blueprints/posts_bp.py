from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson.objectid import ObjectId
from db.collections.Posts import Posts

posts_bp = Blueprint("posts_bp", __name__)


@posts_bp.post('/list')
@jwt_required()
def get_posts():
    data = request.get_json()
    query = {}
    user_id = data.get('userId')
    if user_id:
        query = {"user_id": ObjectId(user_id)}
    res = Posts.find_paginated(data.get('lastId'), query, limit=data.get('limit'))
    return {"message": "OK", "items": res['data'], "total": res['total']}
