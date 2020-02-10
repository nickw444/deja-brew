from marshmallow import fields

from .orders_dto import User, Order
from .schema import CamelCaseSchema


class GetUserInfoRequest(CamelCaseSchema):
    id = fields.String(required=True)


class GetUserInfoResponse(CamelCaseSchema):
    user = fields.Nested(User, required=True)
