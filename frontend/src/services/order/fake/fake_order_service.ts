import { delay } from 'base/delay';
import { aUserInfoWith } from 'services/user/fake/builders';
import {
  CoffeeType,
  CreateOrderRequest,
  CreateOrderResponse,
  Extra,
  GetOrdersRequest,
  GetOrdersResponse,
  Order,
  OrderStatus,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from '../order_dto';
import { OrderService } from '../order_service';
import { anOrderWith } from './builders';

const FAKE_USER = aUserInfoWith();

export class FakeOrderService implements OrderService {
  constructor(private readonly delay: number) {
  }

  private readonly orders: Order[] = [
    anOrderWith({
      user: FAKE_USER,
      coffeeType: CoffeeType.FLAT_WHITE,
    }),
    anOrderWith({
      user: FAKE_USER,
      coffeeType: CoffeeType.LONG_BLACK,
      extras: [Extra.DECAF],
    }),
    anOrderWith({
      user: FAKE_USER,
      coffeeType: CoffeeType.MATCHA,
      status: OrderStatus.ACCEPTED,
    }),
    anOrderWith({
      user: FAKE_USER,
      status: OrderStatus.READY,
      extras: [],
    }),
  ];

  async createOrder(req: CreateOrderRequest): Promise<CreateOrderResponse> {
    await delay(this.delay);
    const order = anOrderWith({
      status: OrderStatus.PENDING,
      ...req,
    });
    this.orders.push(order);
    return new CreateOrderResponse({ order });
  }

  async getOrders(req: GetOrdersRequest): Promise<GetOrdersResponse> {
    await delay(this.delay);
    return new GetOrdersResponse({ orders: this.orders });
  }

  async updateOrder(req: UpdateOrderRequest): Promise<UpdateOrderResponse> {
    await delay(this.delay);
    const orderIdx = this.orders.findIndex(order => order.id === req.orderId);
    const updatedOrder = new Order({
      ...this.orders[orderIdx],
      status: req.status,
    });
    this.orders.splice(orderIdx, 1, updatedOrder);

    return new UpdateOrderResponse({
      order: updatedOrder,
    });
  }

}
