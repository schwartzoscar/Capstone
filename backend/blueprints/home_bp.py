from flask import Blueprint, render_template, request

home_bp = Blueprint("home_bp", __name__)


# Home App Route
@home_bp.route('/home', methods=['POST', 'GET'])
def home():
    if request.method == 'POST':
        data = request.json

    elif request.method == 'GET':
        return render_template('home.html')
