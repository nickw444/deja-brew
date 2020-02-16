import { CoffeeType, CupSize, Extra, MilkType, Order, OrderStatus } from 'services/order/order_dto';

export function anOrderWith(opts: Partial<Order> = {}): Order {
  return new Order({
    id: 'OAAAAAA',
    coffeeType: CoffeeType.CAPPUCCINO,
    status: OrderStatus.PREPARING,
    cupSize: CupSize.SMALL,
    extras: [Extra.EXTRA_SHOT],
    milkType: MilkType.REGULAR,
    userId: 'UAAAAA',
    ...opts,
  });
}
