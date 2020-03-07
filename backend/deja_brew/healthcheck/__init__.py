from flask import Blueprint, jsonify, current_app

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


@healthz_bp.route('/rps')
def rps():
    (avg_1, avg_5, avg_60) = current_app.rps_counter.get_stats()
    return jsonify(
        avg1=avg_1,
        avg5=avg_5,
        avg60=avg_60,
    )
