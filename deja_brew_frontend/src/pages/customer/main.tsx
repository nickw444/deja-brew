import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CustomerRoutes } from 'routes/customer_routes';


export function createCustomerPage(): React.ComponentType {

  const AppContent = () => (
      <Skeleton
          history={history}
          AppTabs={() => <div></div>}
          Header={Header}
          Content={AppContent}
      />
  );

  return () => (
      <Switch>
        <Route path={CustomerRoutes.newOrder()}/>
        <Route path={CustomerRoutes.orderHistory()}/>
        <Route path={CustomerRoutes.index()}/>
      </Switch>
  );
}
