import { delay } from 'base/delay';
import { History } from 'history';
import { Home } from 'pages/home/home';
import React from 'react';
import { Routes } from 'routes/routes';
import { anOrderWith } from 'services/order/fake/builders';
import { OrderService } from 'services/order/order_service';

const FAKE_ORDERS = [
  anOrderWith(),
];

export function createHomePage({
  orderService,
  history,
}: {
  orderService: OrderService,
  history: History
}) {
  const onNewOrderClick = () => history.push(Routes.newOrder());
  const onOrderAgainClick = () => void 0;

  const HomeImpl = React.memo(() => (
      <Home
          activeOrders={FAKE_ORDERS}
          lastOrder={undefined}
          onNewOrderClick={onNewOrderClick}
          onOrderAgainClick={onOrderAgainClick}
      />
  ));

  return {
    HomePage: HomeImpl,
    refreshOrders: () => delay(500),
  };
}

