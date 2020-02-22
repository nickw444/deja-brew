from flask import request
from flask.views import MethodView
from flask_login import current_user, login_required

from deja_brew.api.order_dto import (
    GetOrdersRequest, GetOrdersResponse, CreateOrderRequest, CreateOrderResponse, GetOrderResponse,
    UpdateOrderResponse, UpdateOrderRequest)
from deja_brew.repository import db, Order, OrderStatus as OrderStatus_, CupSize as CupSize_, \
    Extra as Extra_, CoffeeType as CoffeeType_, MilkType as MilkType_

# TODO(NW): Implement security so only order owners and ADMIN/CAFE_STAFF can view orders.

class OrdersView(MethodView):
    def get(self):
        req = GetOrdersRequest().load(request.args)
        filters = []
        if req['created_by'] == 'me':
            filters.append(Order.user == current_user)

        if req['statuses']:
            db_statuses = map(lambda s: OrderStatus_[s.name], req['statuses'])
            filters.append(Order.status.in_(db_statuses))

        if req['created_after']:
            filters.append(Order.created_at > req['created_after'])

        orders = db.session.query(Order).filter(*filters).limit(req['limit'])
        return GetOrdersResponse().dump({
            'orders': orders,
        })

    @login_required
    def post(self):
        req = CreateOrderRequest().load(request.get_json())

        cup_size = CupSize_[req['cup_size'].name]
        coffee_type = CoffeeType_[req['coffee_type'].name]
        milk_type = MilkType_[req['milk_type'].name]
        extras = list(map(lambda e: Extra_[e.name], req['extras']))

        order = Order(
            user=current_user,
            cup_size=cup_size,
            coffee_type=coffee_type,
            milk_type=milk_type,
            extras=extras,
        )

        db.session.add(order)
        db.session.commit()

        return CreateOrderResponse().dump(dict(
            order=order
        ))


class OrderView(MethodView):
    def get(self, order_id: str):
        order = db.session.query(Order).filter_by(id=order_id).first_or_404()

        return GetOrderResponse().dump(dict(
            order=order,
        ))

    def post(self, order_id: str):
        req = UpdateOrderRequest().load(request.get_json())
        order = db.session.query(Order).filter_by(id=order_id).first_or_404()

        # TODO(NW): Ensure order can only go _forwards_
        order.status = OrderStatus_[req['status'].name]
        db.session.commit()

        return UpdateOrderResponse().dump(dict(
            order=order
        ))
