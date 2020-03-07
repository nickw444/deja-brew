import { createAuthDecorators } from 'auth/auth_helpers';
import { Deserialization } from 'base/deserialization';
import { Bootstrap } from 'bootstrap_dto';
import { createHeader } from 'header/create';
import { createBrowserHistory } from 'history';
import { observer } from 'mobx-react';
import { createAuthPage } from 'pages/auth/create';
import { createHomePage } from 'pages/home/create';
import { createOrderFormFlow } from 'pages/order_form/create';
import { createOrdersPage } from 'pages/orders/create';
import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from 'routes/routes';
import { installServices } from 'services/install';
import { Skeleton } from 'skeleton/skeleton';
import { CafeStatusPresenter, CafeStatusStore } from 'ui/cafe_status/cafe_status_presenter';
import { withContainer } from 'ui/container/container';
import './index.css';

function main() {
  const {
    user,
    mode,
  } = Deserialization.requiredObject(Bootstrap.deserialize, window, 'bootstrap');

  const { orderService, cafeService } = installServices(mode);

  const cafeStatusStore = new CafeStatusStore();
  const cafeStatusPresenter = new CafeStatusPresenter(cafeService);

  const history = createBrowserHistory();

  const { AuthPage } = createAuthPage();
  const { OrdersPage } = createOrdersPage({
    orderService,
    cafeStatusStore,
    cafeStatusPresenter,
  });
  const { HomePage, refreshOrders } = createHomePage({
    orderService,
    history,
    cafeStatusStore,
  });
  const { OrderFormFlow } = createOrderFormFlow({
    history,
    orderService,
    refreshOrders,
  });

  const { withAuthRequired, withAnonOnly } = createAuthDecorators({
    user,
  });

  const { Header } = createHeader({
    userInfo: user,
    cafeStatusStore,
  });
  const HomePageImpl = withContainer(withAuthRequired(HomePage));
  const OrdersPageImpl = withAuthRequired(OrdersPage/*, Role.CAFE_STAFF */);
  const AuthPageImpl = withContainer(withAnonOnly(AuthPage));
  const OrderFormFlowImpl = withContainer(withAuthRequired(OrderFormFlow));

  const AppContent = observer(() => (
      <Switch>
        <Route path={Routes.login()} component={AuthPageImpl}/>
        <Route path={Routes.orders()} component={OrdersPageImpl}/>
        {cafeStatusStore.acceptingOrders !== false
            ? <Route path={Routes.newOrder()} component={OrderFormFlowImpl}/>
            : <Redirect path={Routes.newOrder()} to={Routes.home()}/>
        }
        <Route path={Routes.home()} component={HomePageImpl}/>
        <Redirect to={Routes.home()}/>
      </Switch>
  ));

  const AppImpl = () => (
      <Skeleton
          history={history}
          AppTabs={() => <div></div>}
          Header={Header}
          Content={AppContent}
      />
  );

  cafeStatusPresenter.refreshStatus(cafeStatusStore);
  cafeStatusPresenter.startRefreshing(cafeStatusStore);
  ReactDOM.render(<AppImpl/>, document.getElementById('root'));
}

main();
