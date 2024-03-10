from flask import Blueprint, request, render_template, jsonify
from db.collections.Users import Users

auth_bp = Blueprint("auth_bp", __name__)


# Login App Route
@auth_bp.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        user = Users.find_one({'email': email, 'password': password})
        if user:
            return jsonify({"message": "Success", "user": user}), 200
        else:
            return jsonify({"message": "Failure"}), 401


# Register App Route
@auth_bp.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        Users.register(username, email, password)
        accounts = Users.find()
        return render_template('register.html', accounts=list(map(lambda a: a.to_json(), accounts)))
    elif request.method == 'GET':
        return render_template('register.html')
