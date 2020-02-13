import { createAuthDecorators, UserInfoStore } from 'auth/auth_helpers';
import { Deserialization } from 'base/deserialization';
import * as mobxReact from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { FetchHttpClient } from 'services/http/fetch_http_client';
import { HttpOrderService } from 'services/order/http_order_service';
import { HttpUserService } from 'services/user/http_user_service';
import { Header } from './header/header';
import './index.css';
import { createAuthPage } from './pages/auth/create';
import { createHomePage } from './pages/home/create';
import { createOrdersPage } from './pages/orders/create';

const Skeleton = React.memo(({
  Header,
  OrdersPage,
  AuthPage,
  HomePage,
}: {
  Header: React.ComponentType,
  OrdersPage: React.ComponentType,
  AuthPage: React.ComponentType,
  HomePage: React.ComponentType,
}) => (
    <Router>
      <Header/>
      <Switch>
        <Route path="/login" component={AuthPage}/>
        <Route path="/orders" component={OrdersPage}/>
        <Route path="/" component={HomePage}/>
      </Switch>
    </Router>
));

function main() {
  const httpService = new FetchHttpClient();
  const orderService = new HttpOrderService(httpService);
  const userService = new HttpUserService(httpService);

  const bootstrap = Deserialization.requiredObject(PageBootstrap.deserialize, window, 'bootstrap');

  const { OrdersPage } = createOrdersPage({ orderService });
  const { HomePage } = createHomePage({ orderService });
  const { AuthPage } = createAuthPage();

  const { userInfoStore, withAuthRequired, withAnonOnly } = createAuthDecorators({ userService });

  const HeaderImpl = createHeader({ userInfoStore });
  const HomePageImpl = withAuthRequired(HomePage);
  const OrdersPageImpl = withAuthRequired(OrdersPage);
  const AuthPageImpl = withAnonOnly(AuthPage);

  const AppImpl = () => (
      <Skeleton
          Header={HeaderImpl}
          OrdersPage={OrdersPageImpl}
          HomePage={HomePageImpl}
          AuthPage={AuthPageImpl}
      />
  );

  ReactDOM.render(<AppImpl/>, document.getElementById('root'));
}

function createHeader({
  userInfoStore,
}: {
  userInfoStore: UserInfoStore
}): React.ComponentType {
  return mobxReact.observer(() => {
    const userInfo = userInfoStore.userInfo
        && userInfoStore.userInfo.state === 'fulfilled'
        && userInfoStore.userInfo.value;
    return (
        <Header userInfo={userInfo}/>
    );
  });
}

main();
