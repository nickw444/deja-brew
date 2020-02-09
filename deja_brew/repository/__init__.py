from flask_sqlalchemy import SQLAlchemy

from .base import Base
from .order import Order
from .user import User

db = SQLAlchemy()
