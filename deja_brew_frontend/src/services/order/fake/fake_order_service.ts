import { delay } from 'base/delay';
import {
  CreateOrderRequest,
  CreateOrderResponse,
  GetOrdersRequest,
  GetOrdersResponse,
  Order,
  OrderStatus,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from '../order_dto';
import { OrderService } from '../order_service';
import { anOrderWith } from './builders';


export class FakeOrderService implements OrderService {
  constructor(private readonly delay: number) {
  }

  private readonly orders: Order[] = [
    anOrderWith(),
    anOrderWith(),
    anOrderWith(),
    anOrderWith(),
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
