from enum import Enum

from marshmallow import fields
from marshmallow_enum import EnumField

from deja_brew.api.user_dto import UserInfo
from deja_brew.base.schema import CamelCaseSchema

FRONTEND_PACKAGE = ""


class Mode(Enum):
    FAKE = 1
    REAL = 2


class Bootstrap(CamelCaseSchema):
    mode = EnumField(Mode, required=True)
    user = fields.Nested(UserInfo, required=False)
