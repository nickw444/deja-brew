from enum import Enum

from marshmallow import fields, validate
from marshmallow_enum import EnumField

from deja_brew.base.schema import CamelCaseSchema, List, Timestamp

FRONTEND_PACKAGE = "services.order"


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


class OrderUserInfo(CamelCaseSchema):
    id = fields.Str(required=True)
    name = fields.Str()
    avatar_url = fields.Str()


class Order(CamelCaseSchema):
    id = fields.Str(required=True)
    user = fields.Nested(OrderUserInfo, required=True)

    cup_size = EnumField(CupSize, required=True)
    coffee_type = EnumField(CoffeeType, required=True)
    milk_type = EnumField(MilkType, required=True)
    extras = List(EnumField(Extra), required=True)
    created_at = Timestamp(required=True, )

    status = EnumField(OrderStatus, required=True)


class GetOrdersRequest(CamelCaseSchema):
    # Filter by the user who created the order
    created_by = fields.String(missing=None, validate=validate.OneOf(['me']))
    # Filter by their status
    statuses = List(EnumField(OrderStatus))
    # Filter by creation time
    created_after = Timestamp()
    # Limit the number of results
    limit = fields.Integer(missing=50, validate=validate.Range(max=100))


class GetOrdersResponse(CamelCaseSchema):
    orders = List(fields.Nested(Order), required=True)
    continuation = fields.String()


class GetOrderResponse(CamelCaseSchema):
    order = fields.Nested(Order, required=True)


class CreateOrderRequest(CamelCaseSchema):
    cup_size = EnumField(CupSize, required=True)
    coffee_type = EnumField(CoffeeType, required=True)
    milk_type = EnumField(MilkType, required=True)
    extras = List(EnumField(Extra), required=True)


class CreateOrderResponse(CamelCaseSchema):
    order = fields.Nested(Order, required=True)


class UpdateOrderRequest(CamelCaseSchema):
    order_id = fields.Str(required=True)
    status = EnumField(OrderStatus, required=True)


class UpdateOrderResponse(CamelCaseSchema):
    order = fields.Nested(Order, required=True)
