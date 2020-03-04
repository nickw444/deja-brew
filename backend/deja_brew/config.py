import os


class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    def __init__(self):
        self.GOOGLE_CLIENT_ID = os.environ['GOOGLE_CLIENT_ID']
        self.GOOGLE_CLIENT_SECRET = os.environ['GOOGLE_CLIENT_SECRET']
        self.GOOGLE_HOSTED_DOMAIN = os.environ.get('GOOGLE_HOSTED_DOMAIN', '*')


class LocalConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'mysql://dejabrew:dejabrew@127.0.0.1:3306/dejabrew'
    SECRET_KEY = 'development-only'
    ASSET_MANIFEST_SUPPLIER_IMPL = 'local'


class ProductionConfig(Config):
    DEBUG = False
    ASSET_MANIFEST_SUPPLIER_IMPL = 'build'

    def __init__(self):
        super(ProductionConfig, self).__init__()

        self.SECRET_KEY = os.environ['SECRET_KEY']
        self.SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URI']
