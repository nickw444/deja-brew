import { Mode } from 'bootstrap_dto';
import { FetchHttpClient } from 'services/http/fetch_http_client';
import { FakeOrderService } from 'services/order/fake/fake_order_service';
import { HttpOrderClient } from 'services/order/http_order_client';
import { OrderService } from 'services/order/order_service';
import { FakeUserService } from 'services/user/fake/fake_user_service';
import { HttpUserClient } from 'services/user/http_user_client';
import { UserService } from 'services/user/user_service';

const FAKE_MODE_DELAY = 500;

export function installServices(mode: Mode): {
  orderService: OrderService,
  userService: UserService,
} {
  switch (mode) {
    case Mode.FAKE:
      return {
        orderService: new FakeOrderService(FAKE_MODE_DELAY),
        userService: new FakeUserService(FAKE_MODE_DELAY),
      };
    case Mode.REAL:
      const httpService = new FetchHttpClient();
      return {
        orderService: new HttpOrderClient(httpService),
        userService: new HttpUserClient(httpService),
      };
  }
}
