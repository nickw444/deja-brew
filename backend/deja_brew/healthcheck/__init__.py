from flask import Blueprint

healthz_bp = Blueprint('healthz', __name__)


@healthz_bp.route('/healthz')
def get_healthz():
    return 'OK'
