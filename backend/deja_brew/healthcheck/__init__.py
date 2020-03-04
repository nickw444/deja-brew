from flask import Blueprint, jsonify

from deja_brew.repository import db
from .version import get_version

healthz_bp = Blueprint('healthz', __name__)


def is_db_healthy():
    try:
        db.session.execute('SELECT 1')
        return True
    except Exception:
        return False


@healthz_bp.route('/')
def index():
    components = dict(
        app=True,
        db=is_db_healthy(),
    )
    is_healthy = all(components.values())

    return jsonify(
        healthy=is_healthy,
        components=components
    ), 200 if is_healthy else 500


@healthz_bp.route('/version')
def version():
    return jsonify(
        version=get_version(),
    )
