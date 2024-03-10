from flask import Flask, render_template
from flask_cors import CORS
from db.MongoJSONProvider import MongoJSONProvider
from db.DB import DB
from db.collections.Users import Users

from blueprints.auth_bp import auth_bp
from blueprints.test_users_bp import test_users_bp
from blueprints.home_bp import home_bp
from blueprints.profile_bp import profile_bp

app = Flask(__name__)
CORS(app, origins="http://localhost:3000", supports_credentials=True)
app.json = MongoJSONProvider(app)

DB.initialize()

app.register_blueprint(auth_bp)
app.register_blueprint(test_users_bp)
app.register_blueprint(home_bp)
app.register_blueprint(profile_bp)


# Index App Route
@app.route('/')
def index():
    accounts = Users.find()
    return render_template('index.html', accounts=list(map(lambda a: a.to_json(), accounts)))


# APP
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
