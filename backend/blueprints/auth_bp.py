from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, set_access_cookies, unset_jwt_cookies, jwt_required, get_jwt_identity
from db.collections.Users import Users

auth_bp = Blueprint("auth_bp", __name__)

import bcrypt

# Register App Route
@auth_bp.post('/auth/register')
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirm_password')

    if password != confirm_password:
        return "Passwords must match", 400

# Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    user = Users.register(username, email, hashed_password) # Stores the hashed password
    if user:
        resp = jsonify({"message": "Success", "user": user})
        access_token = create_access_token(identity=str(user._id))
        set_access_cookies(resp, access_token)
        return resp
    else:
        return {"message": "Failure"}


# Login App Route
@auth_bp.post('/auth/login')
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Find the user by email
    user = Users.find_one({'email': email})


    if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
        # Password matches
        resp = jsonify({"message": "Success", "user": user})
        access_token = create_access_token(identity=str(user['_id']))
        set_access_cookies(resp, access_token)
        return resp
    else:
        return {"message": "Failure"}


@auth_bp.post('/auth/cookieLogin')
@jwt_required()
def cookieLogin():
    user_id = get_jwt_identity()
    if not user_id:
        return {"message": "Failure"}
    user = Users.find_by_id(user_id)
    resp = jsonify({"message": "OK", "user": user})
    access_token = create_access_token(identity=user_id)
    set_access_cookies(resp, access_token)
    return resp


@auth_bp.post('/auth/logout')
def logout():
    resp = jsonify({"message": "OK"})
    unset_jwt_cookies(resp)
    return resp
