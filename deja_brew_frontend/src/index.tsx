import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { FetchHttpClient } from 'services/http/fetch_http_client';
import { HttpOrderService } from 'services/order/http_order_service';
import { Header } from './header/header';
import './index.css';
import { createAuthPage } from './pages/auth/create';
import { createHomePage } from './pages/home/create';
import { createOrdersPage } from './pages/orders/create';

const App = React.memo(({
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
        <Route path="/orders" component={OrdersPage}/>
        <Route path="/auth" component={AuthPage}/>
        <Route path="/" component={HomePage}/>
      </Switch>
    </Router>
));

function main() {
  const httpService = new FetchHttpClient();
  const orderService = new HttpOrderService(httpService);

  const { OrdersPage } = createOrdersPage({ orderService });
  const { HomePage } = createHomePage({ orderService });
  const { AuthPage } = createAuthPage();
  const AppImpl = () => (
      <App
          Header={Header}
          OrdersPage={OrdersPage}
          HomePage={HomePage}
          AuthPage={AuthPage}
      />
  );

  ReactDOM.render(<AppImpl/>, document.getElementById('root'));
}

main();
