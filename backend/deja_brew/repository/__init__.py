from flask_sqlalchemy import SQLAlchemy

from .base import Base
from .order import Order, OrderStatus, CoffeeType, CupSize, MilkType, Extra
from .user import User

db = SQLAlchemy()
