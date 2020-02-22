import datetime
from enum import Enum

import sqlalchemy as sa
from sqlalchemy import ForeignKey

from .base import Base
from .enum_list import EnumList
from .id_generator import IdGenerator


class CupSize(Enum):
    SMALL = 1
    MEDIUM = 2
    LARGE = 3


class CoffeeType(Enum):
    LATTE = 1
    CAPPUCCINO = 2
    FLAT_WHITE = 3
    LONG_BLACK = 4
    MOCHA = 5
    HOT_CHOC = 6
    MATCHA = 7
    ESPRESSO = 8


class MilkType(Enum):
    REGULAR = 1
    SKIM = 2
    SOY = 3
    ALMOND = 4
    OAT = 5


class Extra(Enum):
    DECAF = 1
    EXTRA_SHOT = 2
    HONEY = 3
    ICED = 4
    SUGAR = 5


class OrderStatus(Enum):
    PENDING = 1
    ACCEPTED = 2
    READY = 3
    CANCELLED = 4


class Order(Base):
    __tablename__ = 'orders'

    _id = sa.Column(sa.Integer(), primary_key=True)
    id = sa.Column(sa.String(), unique=True, default=IdGenerator('O'))
    created_at = sa.Column(sa.DateTime(), default=datetime.datetime.now)

    user_id = sa.Column(sa.Integer(), ForeignKey('users._id'))
    user = sa.orm.relationship('User')

    cup_size = sa.Column(sa.Enum(CupSize), nullable=False)
    coffee_type = sa.Column(sa.Enum(CoffeeType), nullable=False)
    milk_type = sa.Column(sa.Enum(MilkType), nullable=False)
    extras = sa.Column(EnumList(Extra), nullable=False)

    status = sa.Column(sa.Enum(OrderStatus), nullable=False, default=OrderStatus.PENDING)
