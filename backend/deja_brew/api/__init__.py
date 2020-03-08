from flask import Blueprint
from marshmallow import ValidationError

from deja_brew.api.cafe import CafeView
from deja_brew.api.order import OrdersView, OrderView
from deja_brew.api.user import UserView

api_bp = Blueprint("api", __name__)
api_bp.add_url_rule("/cafe", view_func=CafeView.as_view("cafe"))
api_bp.add_url_rule("/orders", view_func=OrdersView.as_view("orders"))
api_bp.add_url_rule("/orders/<string:order_id>", view_func=OrderView.as_view("order"))
api_bp.add_url_rule("/users/<string:user_id>", view_func=UserView.as_view("user"))


@api_bp.errorhandler(ValidationError)
def handle_validation_error(e):
    return e.messages, 422


@api_bp.route("/error")
def error():
    raise Exception("Errorr")
