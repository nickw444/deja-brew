import { CoffeeType, CupSize, Extra, MilkType, Order, OrderStatus } from 'services/order/order_dto';

const idGenerator = (prefix: string, initial: number) => () => prefix + (initial++).toString();
export const orderIdGenerator = idGenerator('OAAAAA', 1);

export function anOrderWith(opts: Partial<Order> = {}): Order {
  return new Order({
    id: orderIdGenerator(),
    coffeeType: CoffeeType.CAPPUCCINO,
    status: OrderStatus.PENDING,
    cupSize: CupSize.SMALL,
    extras: [Extra.EXTRA_SHOT],
    milkType: MilkType.REGULAR,
    userId: 'UAAAAA',
    createdAt: Date.now() / 1000,
    ...opts,
  });
}
