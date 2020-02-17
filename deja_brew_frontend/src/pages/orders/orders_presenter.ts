import * as mobx from 'mobx';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';
import { GetOrdersRequest, Order, OrderStatus, UpdateOrderRequest } from 'services/order/order_dto';
import { OrderService } from 'services/order/order_service';

export class OrdersStore {
  @mobx.observable.ref
  orders: IPromiseBasedObservable<Order[]> | undefined;
}

const ACTIVE_STATUSES = [OrderStatus.PENDING, OrderStatus.ACCEPTED];

export class OrdersPresenter {
  constructor(
      private readonly orderService: OrderService,
  ) {
  }

  @mobx.action
  fetchOrders(store: OrdersStore) {
    store.orders = fromPromise(
        this.orderService.getOrders(new GetOrdersRequest({}))
            .then(resp => resp.orders));
  }

  getActiveOrders(store: OrdersStore) {
    return store.orders && store.orders.state === 'fulfilled'
        ? store.orders.value.filter(order => ACTIVE_STATUSES.includes(order.status))
        : [];
  }

  @mobx.action
  async handleOrderClick(store: OrdersStore, order: Order) {
    await this.orderService.updateOrder(new UpdateOrderRequest({
      orderId: order.id,
      status: getNextStatus(order.status),
    }));
    this.fetchOrders(store);
  }

  @mobx.action
  async handleOrderLongPress(store: OrdersStore, order: Order) {

  }

}

function getNextStatus(status: OrderStatus): OrderStatus {
  switch (status) {
    case OrderStatus.PENDING:
      return OrderStatus.ACCEPTED;
    case OrderStatus.ACCEPTED:
      return OrderStatus.READY;
    case OrderStatus.READY:
      return OrderStatus.READY;
    case OrderStatus.CANCELLED:
      return OrderStatus.CANCELLED;
  }
}
