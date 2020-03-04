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
    presenter.startRefreshing(store);
  };
  const onWillUnmount = () => {
    presenter.stopRefreshing(store);
  };

  const onOrderClick = (card: OrderCardStore) =>
      presenter.handleOrderCardClick(store, card);
  const onOrderLongPress = (card: OrderCardStore) =>
      presenter.handleOrderCardLongPress(store, card);

  const OrdersGridImpl = mobxReact.observer(() => (
      <OrdersGrid
          onOrderCardClick={onOrderClick}
          onOrderCardLongPress={onOrderLongPress}
          cards={presenter.getActiveOrders(store) || []}/>
  ));
  const OrdersPageImpl = mobxReact.observer(() => (
      <OrdersPage
          OrdersGrid={OrdersGridImpl}
          onMount={onMount}
          onWillUnmount={onWillUnmount}
          isLoading={presenter.getActiveOrders(store) == null}
          isEmpty={(presenter.getActiveOrders(store) || []).length === 0}
      />
  ));
  return { OrdersPage: OrdersPageImpl };
}
