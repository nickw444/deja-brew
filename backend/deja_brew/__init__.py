from flask import Flask
from oauthlib.oauth2 import WebApplicationClient

from deja_brew.api import api_bp
from deja_brew.auth import auth_bp
from deja_brew.auth.login_manager import login_manager
from deja_brew.config import Config, LocalConfig
from deja_brew.frontend import frontend_bp
from deja_brew.frontend.asset_manifest_supplier import create_asset_manifest_supplier
from deja_brew.healthcheck import healthz_bp
from deja_brew.repository import db, Base


def create_app(config: Config = None):
    if config is None:
        config = LocalConfig()

    # Re-map top level application static so the frontend blueprint can register its
    # static path at /static.
    app = Flask(__name__, static_url_path='/_static')
    app.config.from_object(config)
    app.register_blueprint(frontend_bp, url_prefix='/')
    app.register_blueprint(auth_bp, url_prefix='/')
    app.register_blueprint(healthz_bp, url_prefix='/_healthz')
    app.register_blueprint(api_bp, url_prefix='/_api')

    db.init_app(app)
    login_manager.init_app(app)

    app.oauth_client = WebApplicationClient(app.config['GOOGLE_CLIENT_ID'])
    app.manifest_supplier = create_asset_manifest_supplier(
        app.config['ASSET_MANIFEST_SUPPLIER_IMPL'])

    return app
