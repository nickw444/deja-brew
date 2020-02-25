import React from 'react';
import { Order } from 'services/order/order_dto';
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
  onNewOrderClick(): void,
  onOrderAgainClick(): void,
  onMount(): void,
  onWillUnmount(): void,
}> {
  componentDidMount(): void {
    this.props.onMount()
  }

  componentWillUnmount(): void {
    this.props.onWillUnmount();
  }

  render() {
    const {
      isLoading,
      activeOrders,
      previousOrder,
      onNewOrderClick,
      onOrderAgainClick,
    } = this.props;
    if (isLoading) {
      return (
          <StatusPanel Icon={LoadingIndicator}>Loading...</StatusPanel>
      )
    }

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
          {activeOrders.length === 0 && previousOrder && (
              <>
                <Row><TitleMedium>Your last order</TitleMedium></Row>
                <Row><OrderTile order={previousOrder} showStatus={false}/></Row>
                <Row><PrimaryButton onClick={onOrderAgainClick}>Order again</PrimaryButton></Row>
                <Row><Divider>OR</Divider></Row>
              </>
          )}
          <Row>
            <SecondaryButton onClick={onNewOrderClick}>New Order</SecondaryButton>
          </Row>
        </div>
    );
  }
}
