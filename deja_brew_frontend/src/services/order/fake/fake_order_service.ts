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

const idGenerator = (initial: number) => () => (initial++).toString();
const orderIdGenerator = idGenerator(1);

export class FakeOrderService implements OrderService {
  private readonly orders: Order[] = [
    anOrderWith(),
    anOrderWith(),
    anOrderWith(),
    anOrderWith(),
  ];

  async createOrder(req: CreateOrderRequest): Promise<CreateOrderResponse> {
    const order = new Order({
      id: orderIdGenerator(),
      userId: 'UAAAAAAAA',
      status: OrderStatus.SUBMITTED,
      ...req,
    });
    this.orders.push(order);
    return new CreateOrderResponse({ order });
  }

  async getOrders(req: GetOrdersRequest): Promise<GetOrdersResponse> {
    return new GetOrdersResponse({ orders: this.orders });
  }

  updateOrder(req: UpdateOrderRequest): Promise<UpdateOrderResponse> {
    throw new Error('Not Implemented');
  }

}
