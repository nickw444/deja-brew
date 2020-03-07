import { withOnUnmount } from 'base/on_unmount_hoc';
import { History } from 'history';
import { observer } from 'mobx-react';
import { createCustomizeStep } from 'pages/order_form/customize/create';
import { OrderFlowPresenter, OrderFlowStore } from 'pages/order_form/order_flow_presenter';
import { createSelectSizeStep } from 'pages/order_form/select_size/create';
import { createSelectTypeStep } from 'pages/order_form/select_type/create';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from 'routes/routes';
import { OrderService } from 'services/order/order_service';
import { Alert, Style } from 'ui/alert/alert';
import { CafeStatusStore } from 'ui/cafe_status/cafe_status_presenter';
import { Row } from 'ui/row/row';

export function createOrderFormFlow({
  history,
  orderService,
  refreshOrders,
  cafeStatusStore,
}: {
  history: History
  orderService: OrderService,
  refreshOrders(): Promise<void>,
  cafeStatusStore: CafeStatusStore,
}) {
  const store = new OrderFlowStore();
  const presenter = new OrderFlowPresenter(orderService, history, refreshOrders);

  const SelectCoffeeStep = createSelectTypeStep({ store, presenter, history });
  const SelectSizeStep = createSelectSizeStep({ store, presenter });
  const CustomizeStep = createCustomizeStep({ store, presenter });

  const withActiveOrder = withValidState(() => store.coffeeType != null, "/new-order/");
  const SelectSizeStepImpl = withActiveOrder(SelectSizeStep);
  const CustomizeStepImpl = withActiveOrder(CustomizeStep);

  const withNewOrderOnUnmount = withOnUnmount(() => presenter.resetOrder(store));
  const AcceptingWarning = observer(() => {
    if (cafeStatusStore.acceptingOrders === false) {
      return (
          <Row>
            <Alert style={Style.INFO}>Déjà Brew is not currently accepting new orders.
              Please check again soon</Alert>
          </Row>
      );
    }
    return <></>;
  });

  const RoutedOrderFormFlow = observer(() => (
      <Switch>
        {cafeStatusStore.acceptingOrders !== false && (
            <>
              <Route path={Routes.newOrder('select-type')} component={SelectCoffeeStep}/>
              <Route path={Routes.newOrder('select-size')} component={SelectSizeStepImpl}/>
              <Route path={Routes.newOrder('customize')} component={CustomizeStepImpl}/>
              <Redirect from={Routes.newOrder()} to={Routes.newOrder('select-type')}/>
            </>
        )}
        <Route path={Routes.newOrder()} component={AcceptingWarning}/>
      </Switch>
  ));

  return {
    OrderFormFlow: withNewOrderOnUnmount(RoutedOrderFormFlow),
  };
}


const withValidState = (
    predicate: () => boolean,
    redirect: string,
) => (Inner: React.ComponentType) => React.memo(() => {
  if (predicate()) {
    return <Inner/>;
  } else {
    return <Redirect to={redirect}/>;
  }
});
