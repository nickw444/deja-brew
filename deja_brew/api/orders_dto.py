from marshmallow import fields, validate
from marshmallow_enum import EnumField

from deja_brew.api.schema import CamelCaseSchema
from deja_brew.repository.order import CoffeeKind, Size, Milk, Extra


class User(CamelCaseSchema):
    id = fields.Str(required=True)
    name = fields.Str()
    avatar_url = fields.Str()
    last_order = fields.Nested('Order')


class Order(CamelCaseSchema):
    id = fields.Str(required=True)
    user = fields.Nested(User, required=True)

    size = EnumField(Size, required=True)
    kind = EnumField(CoffeeKind, required=True)
    milk = EnumField(Milk, required=True)
    extras = fields.List(EnumField(Extra), required=True)

    completed = fields.Boolean(required=True)


class GetOrdersRequest(CamelCaseSchema):
    active_only = fields.Boolean(missing=True)
    continuation = fields.String(missing=None)
    limit = fields.Integer(missing=50, validate=validate.Range(max=100))


class GetOrdersResponse(CamelCaseSchema):
    orders = fields.List(fields.Nested(Order), required=True)
    continuation = fields.String()


class GetOrderResponse(CamelCaseSchema):
    order = fields.Nested(Order, required=True)


class CreateOrderRequest(CamelCaseSchema):
    size = EnumField(Size, required=True)
    kind = EnumField(CoffeeKind, required=True)
    milk = EnumField(Milk, required=True)
    extras = fields.List(EnumField(Extra), required=True)


class CreateOrderResponse(CamelCaseSchema):
    order = fields.Nested(Order, required=True)


class UpdateOrderRequest(CamelCaseSchema):
    completed = fields.Boolean(required=True)


class UpdateOrderResponse(CamelCaseSchema):
    order = fields.Nested(Order, required=True)
