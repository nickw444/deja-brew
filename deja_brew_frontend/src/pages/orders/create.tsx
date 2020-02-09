import * as mobxReact from 'mobx-react';
import { OrdersPresenter, OrdersStore } from 'pages/orders/orders_presenter';
import React from 'react';
import { OrderService } from 'services/order/order_service';
import { OrdersGrid, OrdersPage } from './orders';

export function createOrdersPage({
  orderService,
}: {
  orderService: OrderService,
}) {
  const store = new OrdersStore();
  const presenter = new OrdersPresenter(orderService);
  const onMount = () => presenter.fetchOrders(store);

  const OrdersGridImpl = mobxReact.observer(() => <OrdersGrid
      orders={store.orders?.state === 'fulfilled' ? store.orders.value : []}/>);
  const OrdersPageImpl = () => <OrdersPage
      OrdersGrid={OrdersGridImpl}
      onMount={onMount}
  />;
  return { OrdersPage: OrdersPageImpl };
}
