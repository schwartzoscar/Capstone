from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson.objectid import ObjectId
from db.collections.Posts import Posts
from db.collections.Users import Users

posts_bp = Blueprint("posts_bp", __name__)


@posts_bp.post('/list')
@jwt_required()
def get_posts():
    data = request.get_json()
    query = {}
    user_id = data.get('userId')
    if user_id:
        query = {"user_id": ObjectId(user_id)}
    res = Posts.find_paginated(data.get('lastId'), query, joins=[*Posts.joins['users']], limit=data.get('limit'))
    return {"message": "OK", "items": res['data'], "total": res['total']}


@posts_bp.post('/uploadImage')
@jwt_required()
def upload_post_image():
    image_blob = request.files.get('file')
    if image_blob:
        user = Users.get_current_user(raw=True)
        if user:
            url = Posts.upload_image(user['_id'], image_blob)
            return {"message": "OK", "url": url}
    return {"message": "Failure"}
