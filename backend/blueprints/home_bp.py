from flask import Blueprint, render_template, request

home_bp = Blueprint("home_bp", __name__)


# Home App Route
@home_bp.route('/home', methods=['POST'])
def home():
    if request.method == 'POST':
        data = request.json
