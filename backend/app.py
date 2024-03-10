from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from db.MongoJSONProvider import MongoJSONProvider
from db.DB import DB
from db.collections.Users import Users

app = Flask(__name__)
CORS(app, origins="http://localhost:3000", supports_credentials=True)
app.json = MongoJSONProvider(app)

DB.initialize()


# Index App Route
@app.route('/')
def index():
    accounts = Users.find()
    return render_template('index.html', accounts=list(map(lambda a: a.to_json(), accounts)))


# Register App Route
@app.route('/register', methods=['POST', 'GET'])
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
    elif request.method == 'GET':
        return render_template('register.html')


# Login App Route
@app.route('/login', methods=['POST'])
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

# Home App Route
@app.route('/home', methods=['POST', 'GET'])
def home():
    if request.method == 'POST':
        data = request.json 
        
    elif request.method == 'GET':
        return render_template('home.html')


# Insert User App Route
@app.route('/insert_user', methods=['GET'])
def insert_user():
    user_data = {
        "username": "test",
        "email": "test",
        "password": "test"
    }
    user = Users(user_data)
    user.save()
    return "User inserted successfully."


@app.route('/update_user/<user_id>')
def update_user(user_id):
    user = Users.find_by_id(user_id)
    if not user:
        return "User not found"
    user.update({"username": "updatedname"})
    user.save()
    return "success"


@app.route('/delete_user/<user_id>')
def delete_user(user_id):
    user = Users.find_by_id(user_id)
    if not user:
        return "User not found"
    user.delete()
    user.save()
    return "success"




# ClearDB App Route
@app.route('/cleardb')
def cleardb():
    Users.clear_users()
    return render_template('cleardb.html')


# APP
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
