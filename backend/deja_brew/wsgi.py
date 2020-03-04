"""
Expose the flask app for serving by a WSGI Server
"""
from flask import request, redirect
from werkzeug.middleware.proxy_fix import ProxyFix

from .__init__ import create_app
from .config import ProductionConfig

config = ProductionConfig()
app = create_app(config)

# https://flask.palletsprojects.com/en/1.1.x/deploying/wsgi-standalone/#deploying-proxy-setups
# https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/x-forwarded-headers.html
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_for=1, x_port=1)


@app.before_request
def rewrite_https():
    """
    When deployed to a production environment such as Amazon Elastic Beanstalk, we must
    implement application level http -> https rewriting.
    """

    if request.path.startswith('/_healthz'):
        # Health blueprint must be accessible via HTTP
        return

    if request.scheme == 'http':
        new_url = request.url.replace('http://', 'https://', 1)
        return redirect(new_url, code=301)
