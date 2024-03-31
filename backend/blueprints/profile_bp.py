from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from db.collections.Users import Users

profile_bp = Blueprint("profile_bp", __name__)


@profile_bp.post('/visited')
@jwt_required()
def get_visited_profile():
    data = request.get_json()
    visited_id = data.get('visitedId')
    if visited_id:
        visited = Users.find_by_id(visited_id, projection={"username": 1, "created_at": 1})
        if visited:
            return {"message": "OK", "visited": visited}
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
