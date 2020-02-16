from marshmallow import fields

from deja_brew.api.user_dto import UserInfo
from deja_brew.base.schema import CamelCaseSchema

FRONTEND_PACKAGE = ""


class Bootstrap(CamelCaseSchema):
    user = fields.Nested(UserInfo, required=False)
