from flask import Flask, render_template, jsonify, request
import pymongo
import flask
import os

#app = Flask(__name__, static_url_path='', static_folder='.')
app = Flask(__name__)

client = pymongo.MongoClient(
    host=os.environ['MONGODB_HOST'],
    username=os.environ['MONGODB_USERNAME'],
    password=os.environ['MONGODB_PASSWORD'],
    port=27017,
    authSource="admin"
)


db = client['thritterdb']
users_collection = db['users']


#Index app route
@app.route('/')
def index():
    accounts = list(users_collection.find({}, {'_id': 0}))
    return render_template('index.html',accounts=accounts)

#Home app route
@app.route('/home')
def home():
    return render_template('home.html')

#Profile app route
@app.route('/profile')
def profile():
    return render_template('profile.html')

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


@app.route('/login', methods=['POST','GET'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        user = users_collection.find_one({'username': username, 'password': password})
        if user:
            return render_template('login.html', message='Login successful', username=username, email=user.get('email', ''), password=user.get('password', ''))
        else:
             return render_template('login.html', message='Username/Password Incorrect')
    elif request.method == 'GET':
        return render_template('login.html')

@app.route('/cleardb')
def cleardb():
    users_collection.delete_many({})
    
    return render_template('cleardb.html')
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)