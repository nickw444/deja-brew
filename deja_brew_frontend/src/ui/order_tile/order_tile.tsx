import React from 'react';
import { Order, OrderStatus } from 'services/order/order_dto';
import { getOrderExtrasLabel, getOrderTypeLabel } from 'ui/labels/labels';
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
          {order.status && <StatusLabel status={order.status}/>}
        </div>
      </div>
  );
};


const labelForStatus: Record<OrderStatus, React.ReactNode> = {
  [OrderStatus.PENDING]: 'Submitted',
  [OrderStatus.ACCEPTED]: 'Preparing',
  [OrderStatus.READY]: 'Ready for pickup',
  [OrderStatus.CANCELLED]: 'Cancelled',
};


const StatusLabel = React.memo(({ status }: { status: OrderStatus }) => {
  const label = labelForStatus[status];
  return <div className={styles.status}>{label}</div>;
});
