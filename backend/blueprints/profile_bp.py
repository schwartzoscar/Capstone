from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from bson.objectid import ObjectId
from db.collections.Users import Users
from db.collections.Posts import Posts
from db.collections.Follows import Follows

profile_bp = Blueprint("profile_bp", __name__)


@profile_bp.post('/visited')
@jwt_required()
def get_visited_profile():
    data = request.get_json()
    visited_id = data.get('visitedId')
    if visited_id:
        visited = Users.find_by_id(visited_id, projection=Users.visitor_fields)
        if visited:
            return {"message": "OK", "visited": visited}
    return {"message": "Failure"}


@profile_bp.post('/getStats')
@jwt_required()
def get_visited_stats():
    data = request.get_json()
    user_id = data.get('userId')
    if user_id:
        user = Users.find_by_id(user_id)
        if user:
            stats = Follows.get_stats(user_id)
            stats['posts'] = Posts.count({"user_id": ObjectId(user_id)})
            return {"message": "OK", "stats": stats}
    return {"message": "Failure"}


@profile_bp.post('/updateImage')
@jwt_required()
def update_profile_img():
    image_blob = request.files.get('file')
    if image_blob:
        user = Users.get_current_user()
        if user:
            user.update_profile_img(image_blob)
            user.save()
            return {"message": "OK"}
    return {"message": "Failure"}


@profile_bp.post('/updateAccountInfo')
@jwt_required()
def update_account_info():
    user = Users.get_current_user()
    if not user:
        return {"message": "Failure"}
    data = request.get_json()
    errors = {}

    username = data.get('username')
    if username and username != user.fields['username']:
        if Users.find_one({"username": username}):
            errors['username'] = "This username has already been taken."
        else:
            user.update({"username": username})

    email = data.get('email')
    if not errors and email and email != user.fields['email']:
        if Users.find_one({"email": email}):
            errors['email'] = "This email has already been taken."
        else:
            user.update({"email": email})

    password = data.get('password')
    confirm = data.get('confirm')
    if not errors and (password or confirm):
        pass_errors = user.update_password(password, confirm)
        if pass_errors:
            errors = {**errors, **pass_errors}

    if errors:
        return {"message": "Failure", "errors": errors}
    if user.has_updates():
        user.save()
    return {"message": "OK"}
