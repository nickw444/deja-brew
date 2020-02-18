import * as mobxReact from 'mobx-react';
import { OrderCardStore, OrdersPresenter, OrdersStore } from 'pages/orders/orders_presenter';
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
  const onMount = () => {
    presenter.refreshOrders(store);
    return presenter.subscribeToUpdates(store);
  };

  const onOrderClick = (card: OrderCardStore) =>
      presenter.handleOrderCardClick(store, card);
  const onOrderLongPress = (card: OrderCardStore) =>
      presenter.handleOrderCardLongPress(store, card);

  const OrdersGridImpl = mobxReact.observer(() => (
      <OrdersGrid
          onOrderCardClick={onOrderClick}
          onOrderCardLongPress={onOrderLongPress}
          cards={presenter.getActiveOrders(store)}/>
  ));
  const OrdersPageImpl = () => (
      <OrdersPage
          OrdersGrid={OrdersGridImpl}
          onMount={onMount}
      />
  );
  return { OrdersPage: OrdersPageImpl };
}
