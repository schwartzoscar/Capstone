from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from db.collections.Forums import Forums
from db.collections.Users import Users

forums_bp = Blueprint("forums_bp", __name__)


@forums_bp.post('/get')
@jwt_required()
def get_forum():
    data = request.get_json()
    forum_name = data.get('forumName')
    if forum_name:
        forum = Forums.find_one({"name": forum_name})
        if forum:
            return {"message": "OK", "forum": forum}
    return {"message": "Failure"}


@forums_bp.post('/uploadTemp')
@jwt_required()
def upload_temp_forum():
    image_blob = request.files.get('profile')
    if not image_blob:
        image_blob = request.files.get('banner')
    if image_blob:
        user = Users.get_current_user(raw=True)
        if user:
            url = Forums.upload_temp_profile(image_blob, user['_id'])
            return {"message": "OK", "url": url}
    return {"message": "Failure"}
