import React from 'react';
import { Order } from 'services/order/order_dto';
import { Alert, Style } from 'ui/alert/alert';
import { PrimaryButton, SecondaryButton } from 'ui/button/button';
import { Divider } from 'ui/divider/divider';
import { LoadingIndicator } from 'ui/loading_indicator/loading_indicator';
import { OrderTile } from 'ui/order_tile/order_tile';
import { Row } from 'ui/row/row';
import { StatusPanel } from 'ui/status_panel/status_panel';
import { TitleMedium } from 'ui/typography/typography';

export class Home extends React.PureComponent<{
  activeOrders: readonly Order[],
  isLoading: boolean,
  previousOrder: Order | undefined,
  acceptingOrders: boolean,
  onNewOrderClick(): void,
  onOrderAgainClick(): void,
  onMount(): void,
  onWillUnmount(): void,
}> {
  componentDidMount(): void {
    this.props.onMount();
  }

  componentWillUnmount(): void {
    this.props.onWillUnmount();
  }

  render() {
    const {
      isLoading,
      activeOrders,
      previousOrder,
      acceptingOrders,
      onNewOrderClick,
      onOrderAgainClick,
    } = this.props;
    if (isLoading) {
      return (
          <StatusPanel Icon={LoadingIndicator}>Loading...</StatusPanel>
      );
    }

    const hasActiveOrder = activeOrders && activeOrders.length > 0;
    return (
        <div>
          {!acceptingOrders && (
              <Row>
                <Alert style={Style.INFO}>Deja Brew is not currently accepting new orders.
                  Please check again soon</Alert>
              </Row>
          )}
          {hasActiveOrder && (
              <>
                <Row><TitleMedium>Your Orders</TitleMedium></Row>
                {activeOrders.map(order => (
                    <React.Fragment key={order.id}>
                      <Row><OrderTile order={order}/></Row>
                    </React.Fragment>
                ))}
              </>
          )}
          {!hasActiveOrder && previousOrder && (
              <>
                <Row><TitleMedium>Your last order</TitleMedium></Row>
                <Row><OrderTile order={previousOrder} showStatus={false}/></Row>
                {acceptingOrders && (
                    <>
                      <Row>
                        <PrimaryButton onClick={onOrderAgainClick}>Order again</PrimaryButton>
                      </Row>
                      <Row><Divider>OR</Divider></Row>
                    </>
                )}
              </>
          )}
          {acceptingOrders && (
              <Row>
                <SecondaryButton onClick={onNewOrderClick}>New Order</SecondaryButton>
              </Row>
          )}
        </div>
    );
  }
}
