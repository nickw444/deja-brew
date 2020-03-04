import json
from os import path

from flask import Blueprint, render_template, current_app, jsonify, send_from_directory, url_for
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


@frontend_bp.route('/manifest.json')
def web_app_manifest():
    return jsonify({
        'short_name': 'Déjà Brew',
        'name': 'Déjà Brew',
        'icons': [
            {
                "src": url_for(".icons_static", filename="avicon.ico"),
                "sizes": "64x64 32x32 24x24 16x16",
                "type": "image/x-icon"
            },
            {
                "src": url_for(".icons_static", filename="ndroid-chrome-192x192.png"),
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                "src": url_for(".icons_static", filename="ndroid-chrome-384x384.png"),
                "sizes": "384x384",
                "type": "image/png"
            },
        ],
        "start_url": ".",
        "display": "standalone",
        "theme_color": "#333333",
        "background_color": "#ffffff"
    })


icons_static_dir = path.join(path.dirname(__file__), 'icons')


@frontend_bp.route('/static/icons/<path:filename>')
def icons_static(filename: str):
    return send_from_directory(icons_static_dir, filename)
