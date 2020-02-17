import React from 'react';
import { Order } from 'services/order/order_dto';
import { getOrderExtrasLabel, getOrderTypeLabel } from 'ui/labels/labels';
import { OrderStatusLabel } from 'ui/order_status_label/order_status_label';
import cappuccino from './assets/cappuccino.jpg';
import styles from './order_tile.module.css';

type RequiredFields = 'cupSize' | 'milkType' | 'extras' | 'coffeeType';
type OptionalFields = 'status';
export type OrderInfo = Pick<Order, RequiredFields> & Partial<Pick<Order, OptionalFields>>;

export const OrderTile = ({
  order,
}: {
  order: OrderInfo,
}) => {
  const extrasLabel = getOrderExtrasLabel(order.extras);
  return (
      <div className={styles.orderTile}>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={cappuccino} alt=""/>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.coffeeType}>{getOrderTypeLabel(order)}</div>
          {extrasLabel && (<div className={styles.extrasLabel}>{extrasLabel}</div>)}
          {order.status != null && (
              <div className={styles.status}>
                <OrderStatusLabel status={order.status}/>
              </div>
          )}
        </div>
      </div>
  );
};
