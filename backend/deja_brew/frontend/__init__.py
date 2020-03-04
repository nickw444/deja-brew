import json
from os import path

from flask import Blueprint, render_template, current_app
from flask_login import current_user

from deja_brew.frontend.asset_manifest_supplier import AssetManifestSupplier
from deja_brew.frontend.bootstrap_dto import Bootstrap, Mode

frontend_bp = Blueprint(
    'frontend',
    __name__,
    template_folder='templates',
    static_folder='build/static',
    static_url_path='/static/'
)

@frontend_bp.route('/')
@frontend_bp.route('/login')
@frontend_bp.route('/orders')
@frontend_bp.route('/home')
@frontend_bp.route('/new-order')
@frontend_bp.route('/new-order/<path:_>')
def frontend(_: str = None):
    manifest = current_app.manifest_supplier.get()
    bootstrap = Bootstrap().dump(dict(
        mode=Mode.REAL,
        user=current_user if current_user.is_authenticated else None,
    ))

    return render_template(
        'index.html',
        json_bootstrap=json.dumps(bootstrap),
        manifest=manifest,
    )
