from flask import Blueprint, render_template
from db.collections.Users import Users

test_users_bp = Blueprint("test_users_bp", __name__)


# Insert User App Route
@test_users_bp.route('/insert_user', methods=['GET'])
def insert_user():
    user_data = {
        "username": "test",
        "email": "test@gmail.com",
        "password": "test"
    }
    user = Users(user_data)
    user.save()
    return "User inserted successfully."


@test_users_bp.route('/update_user/<user_id>')
def update_user(user_id):
    user = Users.find_by_id(user_id)
    if not user:
        return "User not found"
    user.update({"username": "updatedname"})
    user.save()
    return "success"


@test_users_bp.route('/delete_user/<user_id>')
def delete_user(user_id):
    user = Users.find_by_id(user_id)
    if not user:
        return "User not found"
    user.delete()
    user.save()
    return "success"


# ClearDB App Route
@test_users_bp.route('/cleardb')
def cleardb():
    Users.clear_users()
    return "success"
