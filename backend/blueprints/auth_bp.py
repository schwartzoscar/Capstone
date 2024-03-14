from flask import Blueprint, request, jsonify
from db.collections.Users import Users
import secrets

auth_bp = Blueprint("auth_bp", __name__)

# Register App Route
@auth_bp.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        data = request.json
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        confirm_password = data.get('confirm_password')

        if password != confirm_password:
            return "Passwords must match", 400

        Users.register(username, email, password)
        accounts = Users.find()
        return render_template('register.html', accounts=list(map(lambda a: a.to_json(), accounts)))

# Login App Route
@auth_bp.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        user = Users.find_one({'email': email, 'password': password})
        if user:
            access_token = secrets.token_hex(16)
            return jsonify({"message": "Success", "user": user, "access_token": access_token}), 200
        else:
            return jsonify({"message": "Failure"}), 401
