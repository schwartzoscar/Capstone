from flask import Flask
import os
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv
from flask_cors import CORS
from flask_jwt_extended import JWTManager, get_jwt, get_jwt_identity, create_access_token, set_access_cookies
from db.MongoJSONProvider import MongoJSONProvider
from db.DB import DB
from services.S3 import S3

from blueprints.auth_bp import auth_bp
from blueprints.posts_bp import posts_bp
from blueprints.profile_bp import profile_bp
from blueprints.forums_bp import forums_bp
from blueprints.users_bp import users_bp 

load_dotenv()
app = Flask(__name__, static_folder='../app/build', static_url_path='/')
CORS(app, origins=os.getenv("CORS_ORIGIN").split(','), supports_credentials=True)
app.json = MongoJSONProvider(app)

app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_COOKIE_SAMESITE"] = "Lax"
app.config["JWT_COOKIE_SECURE"] = False if os.getenv("ENV") == "dev" else True
app.config["JWT_COOKIE_DOMAIN"] = None if os.getenv("ENV") == "dev" else os.getenv("JWT_COOKIE_DOMAIN")
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

DB.initialize()
S3.initialize()

app.register_blueprint(auth_bp, url_prefix='/api/auth')
app.register_blueprint(posts_bp, url_prefix='/api/posts')
app.register_blueprint(profile_bp, url_prefix='/api/profile')
app.register_blueprint(forums_bp, url_prefix='/api/forums')
app.register_blueprint(users_bp, url_prefix='/api/users') 

# After every request, refresh any token that is within 30 minutes of expiring.
@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original response
        return response


# Serves the React app on production.
@app.route('/')
def index():
    return app.send_static_file('index.html')


# Runs the development Flask server.
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
