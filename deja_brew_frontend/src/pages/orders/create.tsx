import * as mobxReact from 'mobx-react';
import { OrdersPresenter, OrdersStore } from 'pages/orders/orders_presenter';
import React from 'react';
import { Order } from 'services/order/order_dto';
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

  const onOrderClick = (order: Order) => presenter.handleOrderClick(store, order);
  const onOrderLongPress = (order: Order) => presenter.handleOrderLongPress(store, order);

  const OrdersGridImpl = mobxReact.observer(() => (
      <OrdersGrid
          onOrderClick={onOrderClick}
          onOrderLongPress={onOrderLongPress}
          orders={presenter.getActiveOrders(store)}/>
  ));
  const OrdersPageImpl = () => (
      <OrdersPage
          OrdersGrid={OrdersGridImpl}
          onMount={onMount}
      />
  );
  return { OrdersPage: OrdersPageImpl };
}
