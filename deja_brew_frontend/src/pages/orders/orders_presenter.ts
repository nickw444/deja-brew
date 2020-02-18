import * as mobx from 'mobx';
import { GetOrdersRequest, Order, OrderStatus, UpdateOrderRequest } from 'services/order/order_dto';
import { OrderService } from 'services/order/order_service';

export type OrderCardStore = {
  isLoading: boolean,
  order: Order,
}

export class OrdersStore {
  @mobx.observable.deep
  cards: OrderCardStore[] | undefined;

  @mobx.observable.ref
  isLoading: boolean = false;

  timerId: number | undefined;
}

const ACTIVE_STATUSES = [OrderStatus.PENDING, OrderStatus.ACCEPTED];

export class OrdersPresenter {
  constructor(
      private readonly orderService: OrderService,
  ) {
  }

  subscribeToUpdates(store: OrdersStore) {
    const timer = window.setInterval(() => this.refreshOrders(store), 1000);
    return () => window.clearInterval(timer);
  }

  @mobx.action
  async refreshOrders(store: OrdersStore) {
    store.isLoading = true;
    const resp = await this.orderService.getOrders(new GetOrdersRequest({
      statuses: ACTIVE_STATUSES,
    }));
    mobx.runInAction(() => {
      store.isLoading = false;
      store.cards = resp.orders.map(order => ({ order, isLoading: false }));
    });
  }

  getActiveOrders(store: OrdersStore) {
    return store.cards
        ? store.cards.filter(card => ACTIVE_STATUSES.includes(card.order.status))
        : [];
  }

  @mobx.action
  async handleOrderCardClick(store: OrdersStore, orderCard: OrderCardStore) {
    orderCard.isLoading = true;

    const resp = await this.orderService.updateOrder(new UpdateOrderRequest({
      orderId: orderCard.order.id,
      status: getNextStatus(orderCard.order.status),
    }));

    mobx.runInAction(() => {
      orderCard.isLoading = false;
      orderCard.order = resp.order;
    });
  }

  @mobx.action
  async handleOrderCardLongPress(store: OrdersStore, orderCard: OrderCardStore) {

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
