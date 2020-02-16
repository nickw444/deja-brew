import React from 'react';
import { PrimaryButton, SecondaryButton } from 'ui/button/button';
import { OrderInfo, OrderTile } from 'ui/order_tile/order_tile';
import { Row } from 'ui/row/row';
import { Paragraph, TitleMedium } from 'ui/typography/typography';

export const SelectSizeStep = React.memo(({
  SizeSelect,
  onSubmitClick,
  onCustomizeClick,
  canSubmitOrder,
  orderInfo,
}: {
  SizeSelect: React.ComponentType,
  onSubmitClick(): void,
  onCustomizeClick(): void,
  canSubmitOrder: boolean,
  orderInfo: OrderInfo | undefined
}) => (
    <div>
      <Row>
        <TitleMedium>Cup Size</TitleMedium>
        <Paragraph>What size of coffee would you like?</Paragraph>
      </Row>
      <SizeSelect/>
      {orderInfo && (
          <>
            <Row><TitleMedium>Your Order</TitleMedium></Row>
            <Row><OrderTile order={orderInfo}/></Row>
          </>
      )}
      <Row>
        <PrimaryButton
            disabled={!canSubmitOrder}
            onClick={onSubmitClick}
        >
          Done
        </PrimaryButton>
      </Row>
      <Row>
        <SecondaryButton
            disabled={!canSubmitOrder}
            onClick={onCustomizeClick}
        >
          Customize &rarr;
        </SecondaryButton>
      </Row>
    </div>
));
