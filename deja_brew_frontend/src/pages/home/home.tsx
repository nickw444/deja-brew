import React from 'react';
import { Order } from 'services/order/order_dto';
import { PrimaryButton, SecondaryButton } from 'ui/button/button';
import { Divider } from 'ui/divider/divider';
import { OrderTile } from 'ui/order_tile/order_tile';
import { Row } from 'ui/row/row';
import { TitleMedium } from 'ui/typography/typography';

export const Home = React.memo(({
  activeOrders,
  previousOrder,
  onNewOrderClick,
  onOrderAgainClick,
  onMount,
}: {
  activeOrders: readonly Order[] | undefined,
  previousOrder: Order | undefined,
  onNewOrderClick(): void,
  onOrderAgainClick(): void,
  onMount(): void,
}) => {
  React.useEffect(() => onMount());
  return (
      <div>
        {activeOrders && activeOrders.length > 0 && (
            <>
              <Row><TitleMedium>Your Orders</TitleMedium></Row>
              {activeOrders.map(order => (
                  <React.Fragment key={order.id}>
                    <Row><OrderTile order={order}/></Row>
                  </React.Fragment>
              ))}
            </>
        )}
        {previousOrder && (
            <>
              <Row><TitleMedium>Your last order</TitleMedium></Row>
              <Row><OrderTile order={previousOrder}/></Row>
              <Row><PrimaryButton onClick={onOrderAgainClick}>Order again</PrimaryButton></Row>
              <Row><Divider>OR</Divider></Row>
            </>
        )}
        <Row>
          <SecondaryButton onClick={onNewOrderClick}>New Order</SecondaryButton>
        </Row>
      </div>
  );
});
