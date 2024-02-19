from flask import Flask, render_template
import pymongo
import flask

app = Flask(__name__, static_url_path='', static_folder='.')

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



if __name__ == '__main__':
    app.run(debug=True)