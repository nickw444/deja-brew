import { createAuthDecorators } from 'auth/auth_helpers';
import { createHeader } from 'header/create';
import { createBrowserHistory } from 'history';
import { createAuthPage } from 'pages/auth/create';
import { createHomePage } from 'pages/home/create';
import { createOrderFormFlow } from 'pages/order_form/create';
import { createOrdersPage } from 'pages/orders/create';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import { Routes } from 'routes/routes';
import { FetchHttpClient } from 'services/http/fetch_http_client';
import { FakeOrderService } from 'services/order/fake/fake_order_service';
import { HttpUserService } from 'services/user/http_user_service';
import { Skeleton } from 'skeleton/skeleton';
import { withContainer } from 'ui/container/container';
import './index.css';

function main() {
  const httpService = new FetchHttpClient();
  const orderService = new FakeOrderService();
  const userService = new HttpUserService(httpService);

  const history = createBrowserHistory();

  const { OrdersPage } = createOrdersPage({ orderService });
  const { HomePage, refreshOrders } = createHomePage({ orderService, history });
  const { AuthPage } = createAuthPage();
  const { OrderFormFlow } = createOrderFormFlow({ history, orderService, refreshOrders });

  const { userInfoStore, withAuthRequired, withAnonOnly } = createAuthDecorators({ userService });

  const { Header } = createHeader({ userInfoStore, history });
  const HomePageImpl = withContainer(withAuthRequired(HomePage));
  const OrdersPageImpl = withAuthRequired(OrdersPage/*, Role.CAFE_STAFF */);
  const AuthPageImpl = withContainer(withAnonOnly(AuthPage));
  const OrderFormFlowImpl = withContainer(withAuthRequired(OrderFormFlow));

  const AppContent = () => (
      <Switch>
        <Route path={Routes.login()} component={AuthPageImpl}/>
        <Route path={Routes.orders()} component={OrdersPageImpl}/>
        <Route path={Routes.newOrder()} component={OrderFormFlowImpl}/>
        <Route path={Routes.home()} component={HomePageImpl}/>
      </Switch>
  );

  const AppImpl = () => (
      <Skeleton
          history={history}
          AppTabs={() => <div></div>}
          Header={Header}
          Content={AppContent}
      />
  );

  ReactDOM.render(<AppImpl/>, document.getElementById('root'));
}

main();
