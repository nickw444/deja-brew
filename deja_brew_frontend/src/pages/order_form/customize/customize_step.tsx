import React from 'react';
import { PrimaryButton } from 'ui/button/button';
import { OrderInfo, OrderTile } from 'ui/order_tile/order_tile';
import { Row } from 'ui/row/row';
import { TitleMedium, TitleSmall } from 'ui/typography/typography';
import styles from './customize_step.module.css';

export const CustomizeStep = React.memo(({
  ExtraShotStepper,
  SugarStepper,
  MilkSelect,
  ExtrasSelect,
  onSubmitClick,
  canSubmitOrder,
  orderInfo,
}: {
  ExtraShotStepper: React.ComponentType,
  SugarStepper: React.ComponentType,
  MilkSelect: React.ComponentType,
  ExtrasSelect: React.ComponentType,
  onSubmitClick(): void,
  canSubmitOrder?: boolean,
  orderInfo: OrderInfo | undefined,
}) => (
    <div>
      <Row><TitleSmall>Milk?</TitleSmall></Row>
      <Row><MilkSelect/></Row>
      <Row><TitleSmall>Extras?</TitleSmall></Row>
      <Row><ExtrasSelect/></Row>
      <Row>
        <div className={styles.stepperGroup}>
          <div>
            <Row><TitleSmall>Sugar</TitleSmall></Row>
            <Row><SugarStepper/></Row>
          </div>
          <div>
            <Row><TitleSmall>Extra Shots</TitleSmall></Row>
            <Row><ExtraShotStepper/></Row>
          </div>
        </div>
      </Row>
      {orderInfo && (
          <>
            <Row>
              <TitleMedium>Your Order</TitleMedium>
            </Row>
            <Row>
              <OrderTile order={orderInfo}/>
            </Row>
          </>
      )}
      <div className={styles.buttonContainer}>
        <PrimaryButton
            onClick={onSubmitClick}
            disabled={!canSubmitOrder}
        >
          Submit Order
        </PrimaryButton>
      </div>
    </div>
));
