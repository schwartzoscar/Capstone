from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

posts_bp = Blueprint("posts_bp", __name__)


@posts_bp.post('/posts/list')
@jwt_required()
def get_posts():
    # TODO
    return {"message": "OK", "posts": [], "total": 0}
