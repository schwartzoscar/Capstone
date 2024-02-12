from flask import Flask, render_template
import pymongo
import flask

app = Flask(__name__)

@app.route('/')
def index():
    pymongo_version = pymongo.__version__
    flask_version = flask.__version__
    return render_template('index.html', pymongo_version=pymongo_version, flask_version=flask_version)

if __name__ == '__main__':
    app.run(debug=True)
