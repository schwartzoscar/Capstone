from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from db.collections.Forums import Forums

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
