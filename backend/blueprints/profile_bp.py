from flask import Blueprint, render_template

profile_bp = Blueprint("profile_bp", __name__)


# Profile App Route
@profile_bp.route('/profile')
def profile():
    return render_template('profile.html')
