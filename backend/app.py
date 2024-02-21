from flask import Flask, render_template, jsonify
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
db = client["thridderdb"]

#Index app route
@app.route('/')
def index():
    pymongo_version = pymongo.__version__
    flask_version = flask.__version__
    return render_template('index.html', pymongo_version=pymongo_version, flask_version=flask_version)

#Home app route
@app.route('/home')
def home():
    return render_template('home.html')

#Profile app route
@app.route('/profile')
def profile():
    return render_template('profile.html')

#Test write to DB
@app.route('/store_animals')
def store_animals():
    db["animal_tb"].drop()
    id = db["animal_tb"].insert_one({"name": "Turtle", "type": "wild"})
    return jsonify({"success": "true"})

# Test read from DB
@app.route('/get_animals')
def get_stored_animals():
    _animals = db.animal_tb.find()
    animals = [{"name": animal["name"], "type": animal["type"]} for animal in _animals]
    return jsonify({"animals": animals})

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)