import classNames from 'classnames';
import React from 'react';
import styles from './toolbar.module.css';

type Props = {
  onStatusClick(): void,
  acceptingOrders: boolean | undefined,
  statusHasPendingUpdate: boolean,
  orderCount: number
}

export const Toolbar = React.memo(({
  acceptingOrders,
  statusHasPendingUpdate,
  onStatusClick,
  orderCount,
}: Props) => (
    <div className={styles.toolbar}>
      <div className={styles.orderCount}>
        {orderCount} active {pluralize('order', orderCount)}
      </div>
      {acceptingOrders != null && (
          <button
              className={styles.storeStatus}
              onClick={onStatusClick}
              disabled={statusHasPendingUpdate}
          >
            <div className={classNames(styles.statusIndicator, {
              [styles.red]: acceptingOrders === false,
              [styles.green]: acceptingOrders === true,
              [styles.pending]: statusHasPendingUpdate,
            })}/>
            {acceptingOrders
                ? 'Accepting new orders'
                : 'Not accepting new orders'
            }
          </button>
      )}
    </div>
));

function pluralize(noun: string, count: number): string {
  return noun + (count === 0 || count > 1 ? 's' : '');
}
