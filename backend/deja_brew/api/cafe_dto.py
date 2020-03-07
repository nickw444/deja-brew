from marshmallow import fields

from deja_brew.base.schema import CamelCaseSchema

FRONTEND_PACKAGE = "services.cafe"

class Cafe(CamelCaseSchema):
    id = fields.Str(required=True)
    accepting_orders = fields.Boolean(required=True)


class GetCafeResponse(CamelCaseSchema):
    cafe = fields.Nested(Cafe, required=True)


class UpdateCafeRequest(CamelCaseSchema):
    accepting_orders = fields.Boolean(required=True)


class UpdateCafeResponse(CamelCaseSchema):
    cafe = fields.Nested(Cafe, required=True)
