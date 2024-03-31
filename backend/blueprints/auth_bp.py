from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, set_access_cookies, unset_jwt_cookies, jwt_required
from db.collections.Users import Users

auth_bp = Blueprint("auth_bp", __name__)


# Register App Route
@auth_bp.post('/register')
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirm_password')

    if password != confirm_password:
        return "Passwords must match", 400

    user = Users.register(username, email, password)
    if user:
        resp = jsonify({"message": "OK", "user": user})
        access_token = create_access_token(identity=str(user._id))
        set_access_cookies(resp, access_token)
        return resp
    else:
        return {"message": "Failure"}


# Login App Route
@auth_bp.post('/login')
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = Users.find_one({'email': email, 'password': password})
    if user:
        resp = jsonify({"message": "OK", "user": user})
        access_token = create_access_token(identity=str(user._id))
        set_access_cookies(resp, access_token)
        return resp
    else:
        return {"message": "Failure"}


@auth_bp.post('/cookieLogin')
@jwt_required()
def cookie_login():
    user = Users.get_current_user()
    if not user:
        return {"message": "Failure"}
    resp = jsonify({"message": "OK", "user": user})
    access_token = create_access_token(identity=str(user._id))
    set_access_cookies(resp, access_token)
    return resp


@auth_bp.post('/refreshUser')
@jwt_required()
def refresh_user():
    user = Users.get_current_user()
    if not user:
        return {"message": "Failure"}
    if not user:
        return {"message": "Failure"}
    return {"message": "OK", "user": user}


@auth_bp.post('/logout')
def logout():
    resp = jsonify({"message": "OK"})
    unset_jwt_cookies(resp)
    return resp
