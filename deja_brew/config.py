import os


class Config:
    DEBUG = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    def __init__(self):
        self.GOOGLE_CLIENT_ID = os.environ['GOOGLE_CLIENT_ID']
        self.GOOGLE_CLIENT_SECRET = os.environ['GOOGLE_CLIENT_SECRET']
        self.GOOGLE_HOSTED_DOMAIN = os.environ.get('GOOGLE_HOSTED_DOMAIN', '*')


class LocalConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///db.sqlite3'
    SECRET_KEY = 'development-only'


class ProductionConfig(Config):
    def __init__(self):
        super(ProductionConfig, self).__init__()

        self.SECRET_KEY = os.environ['SECRET_KEY']
        self.SQLALCHEMY_DATABASE_URI = os.environ['SQLALCHEMY_DATABASE_URI']
