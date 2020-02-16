import { HttpService } from '../http/http_service';
import {
  CreateOrderRequest,
  CreateOrderResponse,
  GetOrdersRequest,
  GetOrdersResponse,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from './order_dto';
import { OrderService } from './order_service';

export class HttpOrderService implements OrderService {
  constructor(
      private readonly httpService: HttpService,
  ) {
  }

  async getOrders(req: GetOrdersRequest): Promise<GetOrdersResponse> {
    const data = await this.httpService.get('/orders');
    return GetOrdersResponse.deserialize(data);
  }

  async createOrder(req: CreateOrderRequest): Promise<CreateOrderResponse> {
    const resp = await this.httpService.post('/orders', CreateOrderRequest.serialize(req));
    return CreateOrderResponse.deserialize(resp);
  }

  updateOrder(req: UpdateOrderRequest): Promise<UpdateOrderResponse> {
    throw new Error('Not Implemented');
  }
}
