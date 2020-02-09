from enum import Enum

import sqlalchemy as sa
from flask_login import UserMixin

from .base import Base
from .enum_list import EnumList
from .id_generator import IdGenerator


class Role(Enum):
    CAFE_STAFF = 1
    ADMIN = 2


class User(Base, UserMixin):
    __tablename__ = 'users'

    _id = sa.Column(sa.Integer(), primary_key=True)
    id = sa.Column(sa.String(), unique=True, default=IdGenerator('U'))
    name = sa.Column(sa.String(255))
    avatar_url = sa.Column(sa.String(255))
    email = sa.Column(sa.String(255), unique=True)
    # Hashed user password. Only used for kiosk, cafe staff, and admin accounts where
    # a Google account may not be available for login.
    password = sa.Column(sa.String(255))
    roles = sa.Column(EnumList(Role))

    # @property
    # def roles(self) -> List[Role]:
    #     if self._roles:
    #         return [Role(x) for x in self._roles.split(',')]
    #
    #     return []
    #
    # @roles.setter
    # def roles(self, new_roles: List[Role]):
    #     self._roles = ','.join([x.value for x in new_roles])
