import * as mobx from 'mobx';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';
import { OrderService } from 'services/order/order_service';
import { GetOrdersRequest, Order } from 'services/order/order_service_objects';

export class OrdersStore {
  @mobx.observable.ref
  orders: IPromiseBasedObservable<Order[]> | undefined;
}

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
}
