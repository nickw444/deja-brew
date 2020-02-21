import json
from os import path

from flask import Blueprint, render_template
from flask_login import current_user

from deja_brew.frontend.asset_manifest_supplier import AssetManifestSupplier
from deja_brew.frontend.bootstrap_dto import Bootstrap, Mode

frontend_bp = Blueprint(
    'frontend',
    __name__,
    template_folder='templates',
    static_folder='static',
    static_url_path='/s/'
)

manifest_supplier = AssetManifestSupplier(
    path.join(path.dirname(__file__), 'static/asset-manifest.json'))


@frontend_bp.route('/')
@frontend_bp.route('/login')
@frontend_bp.route('/orders')
def frontend(path=None):
    manifest = manifest_supplier.get()
    bootstrap = Bootstrap().dump(dict(
        mode=Mode.REAL,
        user=current_user if current_user.is_authenticated else None,
    ))

    return render_template(
        'index.html',
        json_bootstrap=json.dumps(bootstrap),
        manifest=manifest,
    )
