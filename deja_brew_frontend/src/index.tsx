import { createAuthDecorators } from 'auth/auth_helpers';
import { Deserialization } from 'base/deserialization';
import { Bootstrap } from 'bootstrap_dto';
import { createHeader } from 'header/create';
import { createBrowserHistory } from 'history';
import { userInfo } from 'os';
import { createAuthPage } from 'pages/auth/create';
import { createHomePage } from 'pages/home/create';
import { createOrderFormFlow } from 'pages/order_form/create';
import { createOrdersPage } from 'pages/orders/create';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { AdminRoutes } from 'routes/admin_routes';
import { CustomerRoutes } from 'routes/customer_routes';
import { LoginRoutes } from 'routes/login_routes';
import { installServices } from 'services/install';
import { withContainer } from 'ui/container/container';
import './index.css';

function main() {
  const {
    user,
    mode,
  } = Deserialization.requiredObject(Bootstrap.deserialize, window, 'bootstrap');

  const { orderService } = installServices(mode);

  const history = createBrowserHistory();

  const { OrdersPage } = createOrdersPage({ orderService });
  const { HomePage, refreshOrders } = createHomePage({ orderService, history });
  const { AuthPage } = createAuthPage();
  const { OrderFormFlow } = createOrderFormFlow({ history, orderService, refreshOrders });

  const { withAuthRequired, withAnonOnly } = createAuthDecorators({
    user,
  });

  const { Header } = createHeader({ userInfo: user });
  const HomePageImpl = withContainer(withAuthRequired(HomePage));
  const OrdersPageImpl = withAuthRequired(OrdersPage/*, Role.CAFE_STAFF */);
  const AuthPageImpl = withContainer(withAnonOnly(AuthPage));
  const OrderFormFlowImpl = withContainer(withAuthRequired(OrderFormFlow));

  const AppImpl = () => (
      <Router history={history}>
        <Switch>
          <Route path={LoginRoutes.index()} component={() => <>Login Page</>}/>
          <Route path={AdminRoutes.index()} component={() => <>Admin Page</>}/>
          <Route path={CustomerRoutes.index()} component={() => <>Customer Page</>}/>
        </Switch>
      </Router>
  );

  ReactDOM.render(<AppImpl/>, document.getElementById('root'));
}

main();
