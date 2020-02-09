from flask import request
from flask_restful import Resource

from deja_brew.api.orders_dto import GetOrdersRequest, GetOrdersResponse, CreateOrderRequest, \
    CreateOrderResponse, GetOrderResponse, UpdateOrderResponse, UpdateOrderRequest
from deja_brew.repository import Order, db


class OrdersResource(Resource):
    def get(self):
        req = GetOrdersRequest().load(request.args)
        print(req)
        orders = db.session.query(Order).all()
        return GetOrdersResponse().dump({
            'orders': orders,
        })

    def post(self):
        req = CreateOrderRequest().load(request.get_json())
        order = Order(
            size=req['size'],
            kind=req['kind'],
            milk=req['milk'],
            extras=req['extras']
        )
        db.session.add(order)
        db.session.commit()

        return CreateOrderResponse().dump(dict(
            order=order
        ))


class OrderResource(Resource):
    def get(self, order_id: str):
        order = db.session.query(Order).filter_by(id=order_id).first_or_404()

        return GetOrderResponse().dump(dict(
            order=order,
        ))

    def delete(self, order_id: str):
        order = db.session.query(Order).filter_by(id=order_id).first_or_404()
        raise NotImplementedError()

    def put(self, order_id: str):
        order = db.session.query(Order).filter_by(id=order_id).first_or_404()

        req = UpdateOrderRequest().load(request.get_json())
        order.completed = req['completed']
        db.session.commit()

        return UpdateOrderResponse().dump(dict(
            order=order
        ))
