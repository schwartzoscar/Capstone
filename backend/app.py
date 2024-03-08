from flask import Flask, render_template, jsonify, request
import pymongo
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="http://localhost:3000", supports_credentials=True)

client = pymongo.MongoClient(
    host=os.environ['MONGODB_HOST'],
    username=os.environ['MONGODB_USERNAME'],
    password=os.environ['MONGODB_PASSWORD'],
    port=27017,
    authSource="admin"
)

db = client['thritterdb']
users_collection = db['users']

# Index App Route
@app.route('/')
def index():
    accounts = list(users_collection.find({}, {'_id': 0}))
    return render_template('index.html',accounts=accounts)

# Profile App Route
@app.route('/profile')
def profile():
    return render_template('profile.html')

# Register App Route
@app.route('/register', methods=['POST','GET'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

        last_user = users_collection.find_one({}, sort=[('_id', pymongo.DESCENDING)])
        if last_user:
            user_id = last_user.get('user_id', 0) + 1
        else:
            user_id = 1

        users_collection.insert_one({'user_id': user_id, 'username': username, 'email': email, 'password': password})
        accounts = list(users_collection.find({}, {'_id': 0}))
        return render_template('register.html', accounts=accounts)
    elif request.method == 'GET':
        return render_template('register.html')

# Insert User App Route
@app.route('/insert_user', methods=['GET'])
def insert_user():
    user_data = {
        "username": "test",
        "email": "test",
        "password": "test"
    }
    users_collection.insert_one(user_data)
    return "User inserted successfully."

# Login App Route
@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        user = users_collection.find_one({'email': email, 'password': password})
        if user:
            return jsonify({"message": "Success", "user": user}), 200
        else:
            return jsonify({"message": "Failure"}), 401

# ClearDB App Route
@app.route('/cleardb')
def cleardb():
    users_collection.delete_many({})
    return render_template('cleardb.html')

# APP
# Insert User App Route
@app.route('/insert_user', methods=['GET'])
def insert_user():
    user_data = {
        "username": "test",
        "email": "test",
        "password": "test"
    }
    users_collection.insert_one(user_data)
    return "User inserted successfully."

# Login App Route
@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        user = users_collection.find_one({'email': email, 'password': password})
        if user:
            return jsonify({"message": "Success", "user": user}), 200
        else:
            return jsonify({"message": "Failure"}), 401

# ClearDB App Route
@app.route('/cleardb')
def cleardb():
    users_collection.delete_many({})
    return render_template('cleardb.html')

# APP
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
