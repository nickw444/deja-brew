import * as React from 'react';
import { Order } from 'services/order/order_dto';
import { cardTitleOfOrder, extrasLabelOfOrder } from 'ui/labels/labels';
import styles from './order_card.module.css';

export const OrderCard = React.memo(({
  order,
  showUser = true,
  showStatus = true,
}: {
  order: Order,
  showUser?: boolean,
  showStatus?: boolean,
}) => {
  const extrasLabel = extrasLabelOfOrder(order);
  return (
      <div className={styles.orderCard}>
        <div className={styles.coffeeType}>{cardTitleOfOrder(order)}</div>
        {extrasLabel && (<div>{extrasLabel}</div>)}
        {showUser && (
            <div className={styles.user}>
              <div className={styles.avatar}><img src="https://i.pravatar.cc/16"/></div>
              <div>Nick Whyte</div>
            </div>
        )}
        {showStatus && (
            <div className={styles.status}>Ready for pickup</div>
        )}
      </div>
  );
});

