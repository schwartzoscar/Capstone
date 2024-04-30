from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson.objectid import ObjectId
from services.S3 import S3
from db.collections.Posts import Posts
from db.collections.Users import Users
from db.collections.Forums import Forums

posts_bp = Blueprint("posts_bp", __name__)


@posts_bp.post('/list')
@jwt_required()
def get_posts():
    data = request.get_json()
    query = {}
    user_id = data.get('userId')
    forum_id = data.get('forumId')
    if user_id:
        query["user_id"] = ObjectId(user_id)
    if forum_id:
        query["forum_id"] = ObjectId(forum_id)
    joins = [*Posts.joins['users'], *Posts.joins['forums']]
    res = Posts.find_paginated(data.get('lastId'), query, joins=joins, limit=data.get('limit'))
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


@posts_bp.post('/deleteImages')
@jwt_required()
def delete_post_images():
    data = request.get_json()
    images = data.get('images')
    user = Users.get_current_user(raw=True)
    if user:
        success = True
        for image in images:
            if not success:
                break
            if image.split('/')[1] == str(user['_id']):
                S3.delete(image)
            else:
                success = False
        if success:
            return {"message": "OK"}
    return {"message": "Failure"}


@posts_bp.post('/forumOptions')
@jwt_required()
def forum_options_for_post():
    user = Users.get_current_user()
    if user:
        options = []
        forums = Forums.aggregate(pipeline=[{"$match": {"users._id": user._id}}], joins=[*Forums.joins['users']], raw=True)
        for forum in forums:
            options.append({"label": forum['name'], "value": forum['_id']})
        return {"message": "OK", "options": options}
    return {"message": "Failure"}


@posts_bp.post('/create')
@jwt_required()
def create_post():
    data = request.get_json()
    user = Users.get_current_user()
    if user:
        post = Posts({
            "title": data.get('title'),
            "content": data.get('content'),
            "user_id": user._id,
            "forum_id": data.get('forumId')
        })
        post.save()
        return {"message": "OK"}
    return {"message": "Failure"}
