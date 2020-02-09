from enum import Enum

import sqlalchemy as sa
from sqlalchemy import ForeignKey

from .base import Base
from .enum_list import EnumList
from .id_generator import IdGenerator


class Size(Enum):
    SMALL = 1
    MEDIUM = 2
    LARGE = 3


class CoffeeKind(Enum):
    LATTE = 1
    CAPPUCCINO = 2
    FLAT_WHITE = 3
    LONG_BLACK = 4
    MOCHA = 5
    HOT_CHOC = 6
    MATCHA = 7
    ESPRESSO = 8


class Milk(Enum):
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


class Order(Base):
    __tablename__ = 'orders'

    _id = sa.Column(sa.Integer(), primary_key=True)
    id = sa.Column(sa.String(), unique=True, default=IdGenerator('O'))

    user_id = sa.Column(sa.Integer(), ForeignKey('users._id'))
    user = sa.orm.relationship('User')

    size = sa.Column(sa.Enum(Size), nullable=False)
    kind = sa.Column(sa.Enum(CoffeeKind), nullable=False)
    milk = sa.Column(sa.Enum(Milk), nullable=False)
    extras = sa.Column(EnumList(Extra), nullable=False)

    completed = sa.Column(sa.Boolean(), default=False)
