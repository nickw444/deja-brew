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
  private readonly orders: Order[] = [
    anOrderWith(),
    anOrderWith(),
    anOrderWith(),
    anOrderWith(),
  ];

  async createOrder(req: CreateOrderRequest): Promise<CreateOrderResponse> {
    const order = anOrderWith({
      status: OrderStatus.PENDING,
      ...req,
    });
    this.orders.push(order);
    return new CreateOrderResponse({ order });
  }

  async getOrders(req: GetOrdersRequest): Promise<GetOrdersResponse> {
    return new GetOrdersResponse({ orders: this.orders });
  }

  async updateOrder(req: UpdateOrderRequest): Promise<UpdateOrderResponse> {
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
