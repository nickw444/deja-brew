import { UrlBuilder } from 'base/url_builder';
import { HttpService } from '../http/http_service';
import {
  CreateOrderRequest,
  CreateOrderResponse,
  GetOrdersRequest,
  GetOrdersResponse,
  OrderStatusUtil,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from './order_dto';
import { OrderService } from './order_service';

export class HttpOrderClient implements OrderService {
  constructor(
      private readonly httpService: HttpService,
  ) {
  }

  async getOrders(req: GetOrdersRequest): Promise<GetOrdersResponse> {
    const data = await this.httpService.get(
        UrlBuilder.forPath('/orders', {
              createdAfter: req.createdAfter,
              createdBy: req.createdBy,
              limit: req.limit,
              statuses: req.statuses.map(OrderStatusUtil.serialize),
            })
            .build(),
    );
    return GetOrdersResponse.deserialize(data);
  }

  async createOrder(req: CreateOrderRequest): Promise<CreateOrderResponse> {
    const resp = await this.httpService.post('/orders', CreateOrderRequest.serialize(req));
    return CreateOrderResponse.deserialize(resp);
  }

  async updateOrder(req: UpdateOrderRequest): Promise<UpdateOrderResponse> {
    const resp = await this.httpService.post(
        `/orders/${req.orderId}`,
        UpdateOrderRequest.serialize(req),
    );
    return UpdateOrderResponse.deserialize(resp);
  }
}
