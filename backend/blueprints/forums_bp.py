from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from bson.objectid import ObjectId
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


@forums_bp.post('/userOptions')
@jwt_required()
def get_forum_user_options():
    current_user = Users.get_current_user(raw=True)
    if current_user:
        options = []
        users = Users.find({"_id": {"$ne": ObjectId(current_user['_id'])}}, raw=True)
        for user in users:
            options.append({"label": user['username'], "value": user['_id']})
        return {"message": "OK", "options": options}
    return {"message": "Failure"}


@forums_bp.post('/join')
@jwt_required()
def join_forum():
    current_user = Users.get_current_user()
    if current_user:
        data = request.get_json()
        forum_id = data.get('forumId')
        forum = Forums.find_by_id(forum_id)
        if forum:
            users = forum.fields['users']
            already_joined = False
            for user in users:
                if user['_id'] == current_user._id:
                    already_joined = True
                    break
            if not already_joined:
                users.append({"_id": current_user._id, "forum_role": "member"})
                forum.update({"users": users})
                forum.save()
                updated = Forums.find_by_id(forum_id)
                return {"message": "OK", "forum": updated}
    return {"message": "Failure"}


@forums_bp.post('/leave')
@jwt_required()
def leave_forum():
    current_user = Users.get_current_user()
    if current_user:
        data = request.get_json()
        forum_id = data.get('forumId')
        forum = Forums.find_by_id(forum_id)
        if forum:
            users = forum.fields['users']
            for i, user in enumerate(users):
                if user['_id'] == current_user._id:
                    del users[i]
            forum.update({"users": users})
            forum.save()
            updated = Forums.find_by_id(forum_id)
            return {"message": "OK", "forum": updated}
    return {"message": "Failure"}


@forums_bp.post('/create')
@jwt_required()
def create_forum():
    data = request.get_json()
    current_user = Users.get_current_user(raw=True)
    if current_user:
        forum_name = data.get('name').lower()
        existing = Forums.find_one({'name': forum_name}, raw=True)
        if existing:
            return {"message": "Failure", "errors": {"name": "A forum with this name already exists."}}
        else:
            users = [{'_id': current_user['_id'], 'forum_role': 'creator'}]
            for user_id, role in data.get('users').items():
                users.append({'_id': ObjectId(user_id), 'forum_role': role})
            forum = Forums({
                'name': forum_name,
                'description': data.get('description'),
                'public': data.get('public'),
                'profile_img': data.get('profileImg'),
                'banner_img': data.get('bannerImg'),
                'users': users
            })
            resp = forum.save()
            if resp.inserted_id:
                new_forum = Forums.find_by_id(resp.inserted_id)
                return {"message": "OK", "forum": new_forum}
    return {"message": "Failure"}
