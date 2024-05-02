from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, unset_jwt_cookies
from bson.objectid import ObjectId
from db.collections.Users import Users
from db.collections.Posts import Posts
from db.collections.Follows import Follows


profile_bp = Blueprint("profile_bp", __name__)


def retrieve_profiles(search_term):
    profiles = Users.find({"username": {"$regex": search_term, "$options": "i"}})
    return list(profiles)

@profile_bp.post('/visited')
@jwt_required()
def get_visited_profile():
    data = request.get_json()
    visited_username = data.get('visitedUsername')
    if visited_username:
        visited = Users.find_one({"username": visited_username}, projection=Users.visitor_fields)
        if visited:
            return {"message": "OK", "visited": visited}
    return {"message": "Failure"}


@profile_bp.route('/getStats', methods=['GET', 'POST'])
@jwt_required()
def get_visited_stats():
    if request.method == 'POST':
        data = request.get_json()
        user_id = data.get('userId')
        if user_id:
            user = Users.find_by_id(user_id)
            if user:
                stats = Follows.get_stats(user_id)
                stats['posts'] = Posts.count({"user_id": ObjectId(user_id)})
                return {"message": "OK", "stats": stats}
        return {"message": "Failure"}
    elif request.method == 'GET':
        pass


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


@profile_bp.post('/follow')
@jwt_required()
def follow_user():
    data = request.get_json()
    user_to_follow = data.get('userId')
    current_user_id = get_jwt_identity()
    
    if user_to_follow != current_user_id:
        Follows.follow(current_user_id, user_to_follow)
        return {"message": "OK"}
    else:
        return {"message": "Failure", "error": "Cannot follow yourself"}

@profile_bp.post('/unfollow')
@jwt_required()
def unfollow_user():
    data = request.get_json()
    user_to_unfollow = data.get('userId')
    current_user_id = get_jwt_identity()
    
    Follows.unfollow(current_user_id, user_to_unfollow)
    return {"message": "OK"}


@profile_bp.post('/updatePrivacySettings')
@jwt_required()
def update_privacy_setting():
    user = Users.get_current_user()
    if not user:
        return {"message": "Failure"}
    
    data = request.get_json()

    # Extract privacy settings data from the request
    who_can_see_posts = data.get('whoCanSeePosts')
    who_can_send_friend_requests = data.get('whoCanSendFriendRequests')
    profile_viewing_option = data.get('profileViewingOption')
    delete_history = data.get('deleteHistory')

    # Update the user's privacy settings
    user.update({
        "privacySettings": {
            "whoCanSeePosts": who_can_see_posts,
            "whoCanSendFriendRequests": who_can_send_friend_requests,
            "profileViewingOption": profile_viewing_option,
            "deleteHistory": delete_history,
        }
    })

    # Save the changes to the user document
    user.save()

    return {"message": "OK"}


@profile_bp.delete('/deleteAccount')
@jwt_required()
def delete_account():
    try:
        current_user_id = get_jwt_identity()
        if current_user_id:
            user = Users.find_by_id(current_user_id)
            if user:
                user.delete()
                user.save()
                resp = jsonify({"message": "OK"})
                unset_jwt_cookies(resp)
                return resp
            else:
                return {"message": "Failure"}, 404
        else:
            return {"message": "Failure"}, 401
    except Exception as e:
        return {"message": "Failure", "error": str(e)}, 500


@profile_bp.post('/search')
@jwt_required()
def search_profiles():
    data = request.get_json()
    searchTerm = data.get('searchTerm')

    if searchTerm:
        profiles = retrieve_profiles(searchTerm)
        return {"message": "OK", "profiles": profiles}
    else:
        return {"message": "Failure", "error": "Search term is required"}


@profile_bp.post('/getFollowing')
@jwt_required()
def get_following_users():
    try:
        data = request.get_json()
        user_id = data.get('userId')
        if user_id:
            following_users = Follows.get_following_users(user_id)
            return {"message": "OK", "users": following_users}
        else:
            return {"message": "Failure", "error": "User ID is required"}, 400
    except Exception as e:
        return {"message": "Failure", "error": str(e)}, 500