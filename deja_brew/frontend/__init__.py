from flask import Blueprint
from flask_login import current_user

frontend_bp = Blueprint('frontend', __name__)


@frontend_bp.route('/')
@frontend_bp.route('/<path:path>')
def frontend(path=None):
    print(current_user)
    return 'frontend'
