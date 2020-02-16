import { History } from 'history';
import { Home } from 'pages/home/home';
import React from 'react';
import { Routes } from 'routes/routes';
import {
  CoffeeType,
  CupSize,
  Extra,
  MilkType,
  Order,
  OrderStatus,
} from 'services/order/order_dto';
import { OrderService } from 'services/order/order_service';

const FAKE_ORDERS = [
  new Order({
    id: 'OAAAAAA',
    status: OrderStatus.COMPLETED,
    cupSize: CupSize.SMALL,
    coffeeType: CoffeeType.ESPRESSO,
    extras: [Extra.EXTRA_SHOT, Extra.SUGAR],
    milkType: MilkType.REGULAR,
    userId: 'UAAAAA',
  }),
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
          lastOrder={FAKE_ORDERS[0]}
          onNewOrderClick={onNewOrderClick}
          onOrderAgainClick={onOrderAgainClick}
      />
  ));

  return { HomePage: HomeImpl };
}

