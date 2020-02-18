import { FetchHttpClient } from 'services/http/fetch_http_client';
import { FakeOrderService } from 'services/order/fake/fake_order_service';
import { HttpOrderService } from 'services/order/http_order_service';
import { OrderService } from 'services/order/order_service';
import { FakeUserService } from 'services/user/fake/fake_user_service';
import { HttpUserService } from 'services/user/http_user_service';
import { UserService } from 'services/user/user_service';

type FakeServicesConfig = {
  type: 'fake',
  delay: number,
}
type RealServicesConfig = {
  type: 'real',
}
type ServicesConfig = RealServicesConfig | FakeServicesConfig

export function installServices(config: ServicesConfig): {
  orderService: OrderService,
  userService: UserService,
} {
  switch (config.type) {
    case 'fake':
      return {
        orderService: new FakeOrderService(config.delay),
        userService: new FakeUserService(config.delay),
      };
    case 'real':
      const httpService = new FetchHttpClient();
      return {
        orderService: new HttpOrderService(httpService),
        userService: new HttpUserService(httpService),
      };
  }
}
