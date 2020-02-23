import { Preconditions } from 'base/preconditions';
import * as mobx from 'mobx';
import { CreateOrderRequest, GetOrdersRequest, Order, OrderStatus } from 'services/order/order_dto';
import { OrderService } from 'services/order/order_service';


export class HomeStore {
  @mobx.observable.ref
  previousOrder: Order | undefined;

  @mobx.observable.ref
  activeOrders: Order[] | undefined;

  /** The interval id of the timer used for refreshing */
  refreshTimer: number | undefined;
}

export class HomePresenter {
  constructor(
      private readonly orderService: OrderService,
  ) {
  }

  @mobx.action
  async loadOrderDetails(store: HomeStore): Promise<void> {
    const [previousOrderResp, activeOrdersResp] = await Promise.all([
      this.fetchPreviousOrder(),
      this.fetchActiveOrders(),
    ]);

    mobx.runInAction(() => {
      store.previousOrder = previousOrderResp.orders[0];
      store.activeOrders = activeOrdersResp.orders;
    });
  }

  startRefreshTimer(store: HomeStore) {
    store.refreshTimer = window.setInterval(() => {
      this.loadOrderDetails(store);
    }, 5000);
  }

  stopRefreshTimer(store: HomeStore) {
    window.clearInterval(store.refreshTimer);
  }

  async handleOrderAgain(store: HomeStore) {
    await this.orderService.createOrder(new CreateOrderRequest({
      ...Preconditions.checkExists(store.previousOrder),
    }));
    await this.loadOrderDetails(store);
  }

  private fetchPreviousOrder() {
    return this.orderService.getOrders(new GetOrdersRequest({
      createdBy: 'me',
      statuses: [OrderStatus.READY],
      limit: 1,
    }));
  }

  private fetchActiveOrders() {
    return this.orderService.getOrders(new GetOrdersRequest({
      createdBy: 'me',
      statuses: [OrderStatus.READY, OrderStatus.PENDING, OrderStatus.ACCEPTED],
      // Orders created within the 30 mins
      createdAfter: Math.round((Date.now() / 1000) - 30 * 60),
    }));
  }
}
