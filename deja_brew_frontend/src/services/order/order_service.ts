import {
  CreateOrderRequest,
  CreateOrderResponse,
  GetOrdersRequest,
  GetOrdersResponse,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from './order_dto';

export interface OrderService {
  getOrders(req: GetOrdersRequest): Promise<GetOrdersResponse>;

  createOrder(req: CreateOrderRequest): Promise<CreateOrderResponse>;

  updateOrder(req: UpdateOrderRequest): Promise<UpdateOrderResponse>;
}
