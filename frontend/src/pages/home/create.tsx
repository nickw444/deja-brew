import { delay } from 'base/delay';
import { History } from 'history';
import * as mobxReact from 'mobx-react';
import { Home } from 'pages/home/home';
import { HomePresenter, HomeStore } from 'pages/home/home_presenter';
import React from 'react';
import { Routes } from 'routes/routes';
import { OrderService } from 'services/order/order_service';

export function createHomePage({
  orderService,
  history,
}: {
  orderService: OrderService,
  history: History
}) {
  const onNewOrderClick = () => history.push(Routes.newOrder());
  const onOrderAgainClick = () => presenter.handleOrderAgain(store);

  const store = new HomeStore();
  const presenter = new HomePresenter(orderService);

  const onMount = () => {
    presenter.loadOrderDetails(store);
    presenter.startRefreshTimer(store);
  };
  const onWillUnmount = () => presenter.stopRefreshTimer(store);

  const HomeImpl = mobxReact.observer(() => (
      <Home
          isLoading={store.activeOrders == null}
          onMount={onMount}
          onWillUnmount={onWillUnmount}
          activeOrders={store.activeOrders || []}
          previousOrder={store.previousOrder}
          onNewOrderClick={onNewOrderClick}
          onOrderAgainClick={onOrderAgainClick}
      />
  ));

  return {
    HomePage: HomeImpl,
    refreshOrders: () => delay(500),
  };
}

