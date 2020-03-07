import { computed } from 'mobx';
import * as mobxReact from 'mobx-react';
import { OrderCardStore, OrdersPresenter, OrdersStore } from 'pages/orders/orders_presenter';
import { Toolbar } from 'pages/orders/toolbar';
import React from 'react';
import { OrderService } from 'services/order/order_service';
import { CafeStatusPresenter, CafeStatusStore } from 'ui/cafe_status/cafe_status_presenter';
import { OrdersGrid, OrdersPage } from './orders';

export function createOrdersPage({
  orderService,
  cafeStatusPresenter,
  cafeStatusStore,
}: {
  orderService: OrderService,
  cafeStatusPresenter: CafeStatusPresenter,
  cafeStatusStore: CafeStatusStore
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

  const orderCount = computed(() => (presenter.getActiveOrders(store) || []).length);
  const onStatusClick = () => cafeStatusPresenter.toggleStatus(cafeStatusStore);

  const ToolbarImpl = mobxReact.observer(() => (
      <Toolbar
          orderCount={orderCount.get()}
          acceptingOrders={cafeStatusStore.acceptingOrders}
          statusHasPendingUpdate={cafeStatusStore.hasPendingUpdate}
          onStatusClick={onStatusClick}
      />
  ));

  const OrdersPageImpl = mobxReact.observer(() => (
      <OrdersPage
          OrdersGrid={OrdersGridImpl}
          Toolbar={ToolbarImpl}
          onMount={onMount}
          onWillUnmount={onWillUnmount}
          isLoading={presenter.getActiveOrders(store) == null}
          isEmpty={(presenter.getActiveOrders(store) || []).length === 0}
      />
  ));
  return { OrdersPage: OrdersPageImpl };
}
