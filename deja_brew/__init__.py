from typing import NamedTuple

import click
from flask import Flask
from flask.cli import with_appcontext
from oauthlib.oauth2 import WebApplicationClient

from deja_brew.api import api_bp
from deja_brew.api.schema import CamelCaseSchema
from deja_brew.auth import auth_bp
from deja_brew.auth.login_manager import login_manager
from deja_brew.config import Config, LocalConfig
from deja_brew.frontend import frontend_bp
from deja_brew.healthcheck import healthz_bp
from deja_brew.repository import db, Base
from deja_brew_tools.dto_generator import DtoGenerator


def create_app(config: Config = LocalConfig()):
    app = Flask(__name__)
    app.config.from_object(config)
    app.register_blueprint(healthz_bp)
    app.register_blueprint(api_bp, url_prefix='/_api')
    app.register_blueprint(frontend_bp)
    app.register_blueprint(auth_bp)


    db.init_app(app)
    login_manager.init_app(app)

    app.cli.add_command(init_db)
    app.cli.add_command(generate_service_objects)

    app.oauth_client = WebApplicationClient(app.config['GOOGLE_CLIENT_ID'])

    return app


@click.command()
@with_appcontext
def init_db():
    Base.metadata.create_all(bind=db.engine)


class Field(NamedTuple):
    name: str
    type: str


@click.command()
def generate_service_objects():
    import deja_brew.api.orders_dto as orders_dto_module

    generator = DtoGenerator()
    generator.generate(
        orders_dto_module,
        'deja_brew_frontend/src/services/order/order_service_objects.ts')
