from flask import Blueprint
from marshmallow import ValidationError

from deja_brew.api.order import OrdersView, OrderView
from deja_brew.api.user import UserResource

api_bp = Blueprint('api', __name__)
api_bp.add_url_rule('/orders', view_func=OrdersView.as_view('orders'))
api_bp.add_url_rule('/orders/<string:order_id>', view_func=OrderView.as_view('order'))


@api_bp.errorhandler(ValidationError)
def handle_validation_error(e):
    return e.messages, 422


@api_bp.route('/error')
def error():
    raise Exception("Errorr")

# api.add_resource(OrdersResource, '/orders')
# api.add_resource(OrderResource, '/orders/<string:order_id>')
# api.add_resource(UserResource, '/users/<string:user_id>')
