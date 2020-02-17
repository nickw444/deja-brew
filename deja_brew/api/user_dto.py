from enum import Enum

from marshmallow import fields
from marshmallow_enum import EnumField

from deja_brew.base.schema import CamelCaseSchema
from .order_dto import Order

FRONTEND_PACKAGE = "services.user"


class Role(Enum):
    ADMIN = 1
    CAFE_STAFF = 2


class UserInfo(CamelCaseSchema):
    id = fields.Str(required=True)
    name = fields.Str()
    avatar_url = fields.Str()
    last_order = fields.Nested(Order)
    roles = fields.List(EnumField(Role), required=True)


class GetUserInfoRequest(CamelCaseSchema):
    id = fields.String(required=True)


class GetUserInfoResponse(CamelCaseSchema):
    user = fields.Nested(UserInfo, required=True)
