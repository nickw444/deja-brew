"""
Expose the flask app for serving by a WSGI Server
"""

from .config import ProductionConfig
from .__init__ import create_app

config = ProductionConfig()
app = create_app(config)
