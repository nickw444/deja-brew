import * as mobx from 'mobx';
import {
  GetOrdersRequest,
  Order,
  OrderStatus,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from 'services/order/order_dto';
import { OrderService } from 'services/order/order_service';

export type OrderCardStore = {
  isLoading: boolean,
  order: Order,
}

export class OrdersStore {
  @mobx.observable.deep
  cards: OrderCardStore[] | undefined;

  refreshTimer: number | undefined;
}

const ACTIVE_STATUSES = [OrderStatus.PENDING, OrderStatus.ACCEPTED];

export class OrdersPresenter {
  constructor(
      private readonly orderService: OrderService,
  ) {
  }

  startRefreshing(store: OrdersStore) {
    store.refreshTimer = window.setInterval(() =>
        this.refreshOrders(store), 10000);
  }

  stopRefreshing(store: OrdersStore) {
    window.clearInterval(store.refreshTimer);
  }

  @mobx.action
  async refreshOrders(store: OrdersStore) {
    const orderCards = await this.fetchOrders();
    mobx.runInAction(() => {
      store.cards = orderCards;
    });
  }

  getActiveOrders(store: OrdersStore) {
    return store.cards && store.cards.filter(card => ACTIVE_STATUSES.includes(card.order.status));
  }

  @mobx.action
  async handleOrderCardClick(store: OrdersStore, orderCard: OrderCardStore) {
    this.stopRefreshing(store);
    orderCard.isLoading = true;

    let resp: UpdateOrderResponse | undefined;
    try {
      resp = await this.orderService.updateOrder(new UpdateOrderRequest({
        orderId: orderCard.order.id,
        status: getNextStatus(orderCard.order.status),
      }));
    } catch (e) {
      // Ignore error
    }

    this.startRefreshing(store);
    mobx.runInAction(() => {
      orderCard.isLoading = false;
      if (resp) {
        orderCard.order = resp.order;
      }
    });
  }

  @mobx.action
  async handleOrderCardLongPress(store: OrdersStore, orderCard: OrderCardStore) {

  }

  private async fetchOrders(): Promise<OrderCardStore[]> {
    const resp = await this.orderService.getOrders(new GetOrdersRequest({
      statuses: ACTIVE_STATUSES,
    }));

    return resp.orders
        .sort((a, b) => a.createdAt - b.createdAt)
        .map(order => ({ order, isLoading: false }));
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
