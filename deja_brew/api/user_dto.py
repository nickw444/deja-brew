from marshmallow import fields

from deja_brew.base.schema import CamelCaseSchema

FRONTEND_PACKAGE = "services.user"


class UserInfo(CamelCaseSchema):
    id = fields.Str(required=True)
    name = fields.Str()
    avatar_url = fields.Str()
    last_order = fields.Nested('Order')


class GetUserInfoRequest(CamelCaseSchema):
    id = fields.String(required=True)


class GetUserInfoResponse(CamelCaseSchema):
    user = fields.Nested(UserInfo, required=True)
