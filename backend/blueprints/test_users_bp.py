from flask import Blueprint
from db.collections.Users import Users

test_users_bp = Blueprint("test_users_bp", __name__)


# Insert User App Route
@test_users_bp.get('/insert_user')
def insert_user():
    user_data = {
        "username": "test",
        "email": "test@gmail.com",
        "password": "test"
    }
    user = Users(user_data)
    user.save()
    return "User inserted successfully."


@test_users_bp.get('/update_user/<user_id>')
def update_user(user_id):
    user = Users.find_by_id(user_id)
    if not user:
        return "User not found"
    user.update({"username": "updatedname"})
    user.save()
    return "success"


@test_users_bp.get('/delete_user/<user_id>')
def delete_user(user_id):
    user = Users.find_by_id(user_id)
    if not user:
        return "User not found"
    user.delete()
    user.save()
    return "success"


# ClearDB App Route
@test_users_bp.get('/cleardb')
def cleardb():
    Users.clear_users()
    return "success"
