from flask import Blueprint, render_template
from flask_login import current_user

frontend_bp = Blueprint('frontend', __name__, template_folder='templates')

FAKE_MANIFEST = {
    'assets': {
        'js': [
            'http://localhost:3000/static/js/bundle.js',
        ]
    }
}


@frontend_bp.route('/')
@frontend_bp.route('/login')
@frontend_bp.route('/orders')
def frontend(path=None):
    print(current_user)
    return render_template('index.html')
