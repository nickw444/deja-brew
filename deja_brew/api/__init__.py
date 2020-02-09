from flask import Blueprint
from flask_restful import Api

from deja_brew.api.orders import OrdersResource, OrderResource

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

api.add_resource(OrdersResource, '/orders')
api.add_resource(OrderResource, '/orders/<string:order_id>')
