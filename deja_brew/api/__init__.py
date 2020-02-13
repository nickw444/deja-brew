from flask import Blueprint
from flask_restful import Api

from deja_brew.api.order import OrdersResource, OrderResource
from deja_brew.api.user import UserResource

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

api.add_resource(OrdersResource, '/orders')
api.add_resource(OrderResource, '/orders/<string:order_id>')
api.add_resource(UserResource, '/users/<string:user_id>')
