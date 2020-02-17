import { UnreachableError } from 'base/preconditions';
import * as React from 'react';
import { useEffect } from 'react';
import { Order, OrderStatus } from 'services/order/order_dto';
import { cardTitleOfOrder, extrasLabelOfOrder } from 'ui/labels/labels';
import styles from './orders.module.css';

export const OrdersPage = React.memo(({
  OrdersGrid,
  onMount,
}: {
  OrdersGrid: React.ComponentType,
  onMount(): void
}) => {
  useEffect(() => onMount());
  return (
      <div className={styles.ordersPage}>
        <OrdersGrid/>
      </div>
  );
});

export const OrdersGrid = React.memo(({
  orders,
  onOrderClick,
  onOrderLongPress,
}: {
  orders: Order[],
  onOrderClick(order: Order): void,
  onOrderLongPress(order: Order): void,
}) => (
    <div className={styles.ordersGrid}>
      {orders.map((order) => (
          <OrderCard
              key={order.id}
              order={order}
              onClick={onOrderClick}
              onLongPress={onOrderLongPress}
          />
      ))}
    </div>
));

// Slightly adapted version of https://stackoverflow.com/a/55880860/913363
const useLongPress = (callback: () => void, ms = 300) => {
  const [startLongPress, setStartLongPress] = React.useState(false);

  useEffect(() => {
    let timerId: number | undefined;
    if (startLongPress) {
      timerId = window.setTimeout(callback, ms);
    } else {
      timerId && window.clearTimeout(timerId);
    }

    return () => {
      window.clearTimeout(timerId);
    };
  }, [callback, ms, startLongPress]);

  const start = React.useCallback(() => {
    setStartLongPress(true);
  }, []);
  const stop = React.useCallback((e: React.TouchEvent | React.MouseEvent) => {
    setStartLongPress(false);
    e.stopPropagation();
  }, []);


  return {
    onTouchStart: start,
    onTouchEnd: stop,
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
  };
};

const OrderCard = React.memo(({
  order,
  onClick,
  onLongPress,
}: {
  order: Order,
  onClick(order: Order): void,
  onLongPress(order: Order): void,
}) => {
  const extrasLabel = extrasLabelOfOrder(order);
  const onClickImpl = React.useCallback(() => onClick(order), [onClick, order]);
  // TODO(NW): Need to stop click when long press occurs
  const onLongPressImpl = React.useCallback(() => onLongPress(order), [onLongPress, order]);
  const pressHandlers = useLongPress(onLongPressImpl, 300);
  return (
      <button
          className={styles.orderCardButton}
          {...pressHandlers}
          onClick={onClickImpl}
      >
        <div className={styles.orderDetails}>
          <div className={styles.coffeeTypeLabel}>
            {cardTitleOfOrder(order)}
          </div>
          {extrasLabel && (<div className={styles.extrasLabel}>{extrasLabel}</div>)}
          <div className={styles.orderStatusLabel}>
            <OrderStatusLabel status={order.status}/> &nbsp;|&nbsp; 22 minutes ago
          </div>
        </div>
        <div className={styles.userDetails}>
          <img className={styles.userAvatar} src="https://i.pravatar.cc/96" alt="User avatar"/>
          <div className={styles.userName}>Nick Whyte</div>
        </div>
      </button>
  );
});

const OrderStatusLabel = ({ status }: { status: OrderStatus }) => {
  switch (status) {
    case OrderStatus.PENDING:
      return <><Bullet color="orange"/> Pending</>;
    case OrderStatus.ACCEPTED:
      return <><Bullet color="#66C136"/> Accepted</>;
    case OrderStatus.READY:
      return <><Checkmark color="#66C136"/> Ready</>;
    case OrderStatus.CANCELLED:
      return <><Cross color="red"/> Cancelled</>;
    default:
      throw new UnreachableError(status);
  }
};

const Bullet = ({ color }: { color: string }) => (<span style={{ color }}>◉</span>);
const Checkmark = ({ color }: { color: string }) => (<span style={{ color }}>✓</span>);
const Cross = ({ color }: { color: string }) => (<span style={{ color }}>✖</span>);
