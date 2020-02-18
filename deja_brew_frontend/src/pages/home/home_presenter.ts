import * as mobx from 'mobx';
import { GetOrdersRequest, Order, OrderStatus } from 'services/order/order_dto';
import { OrderService } from 'services/order/order_service';


export class HomeStore {
  @mobx.observable.ref
  previousOrder: Order | undefined;

  @mobx.observable.ref
  activeOrders: Order[] | undefined;

  @mobx.observable.ref
  isLoading: boolean = false;
}

export class HomePresenter {
  constructor(private readonly orderService: OrderService) {
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
      createdAfter: (Date.now() / 1000) - 30 * 60,
    }));
  }

  @mobx.action
  async loadOrderDetails(store: HomeStore) {
    store.isLoading = true;

    const [previousOrderResp, activeOrdersResp] = await Promise.all([
      this.fetchPreviousOrder(),
      this.fetchActiveOrders(),
    ]);

    mobx.runInAction(() => {
      store.isLoading = false;
      store.previousOrder = previousOrderResp.orders[0];
      store.activeOrders = activeOrdersResp.orders;
    });
  }
}
