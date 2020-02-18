import classNames from 'classnames';
import { formatDistance } from 'date-fns';
import * as mobxReact from 'mobx-react';
import { OrderCardStore } from 'pages/orders/orders_presenter';
import * as React from 'react';
import { useEffect } from 'react';
import { cardTitleOfOrder, extrasLabelOfOrder } from 'ui/labels/labels';
import { LoadingIndicator } from 'ui/loading_indicator/loading_indicator';
import { OrderStatusLabel } from 'ui/order_status_label/order_status_label';
import styles from './orders.module.css';


export const OrdersPage = React.memo(({
  OrdersGrid,
  onMount,
}: {
  OrdersGrid: React.ComponentType,
  onMount(): () => void
}) => {
  useEffect(() => onMount());
  return (
      <div className={styles.ordersPage}>
        <OrdersGrid/>
      </div>
  );
});

export const OrdersGrid = React.memo(({
  cards,
  onOrderCardClick,
  onOrderCardLongPress,
}: {
  cards: OrderCardStore[],
  onOrderCardClick(order: OrderCardStore): void,
  onOrderCardLongPress(order: OrderCardStore): void,
}) => (
    <div className={styles.ordersGrid}>
      {cards.map((card) => (
          <OrderCard
              key={card.order.id}
              store={card}
              onClick={onOrderCardClick}
              onLongPress={onOrderCardLongPress}
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

const OrderCard = mobxReact.observer(({
  store,
  onClick,
  onLongPress,
}: {
  store: OrderCardStore,
  onClick(order: OrderCardStore): void,
  onLongPress(order: OrderCardStore): void,
}) => {
  const { order, isLoading } = store;
  const extrasLabel = extrasLabelOfOrder(order);
  const onClickImpl = React.useCallback(() => onClick(store), [onClick, store]);
  // TODO(NW): Need to stop click when long press occurs
  const onLongPressImpl = React.useCallback(() => onLongPress(store), [onLongPress, store]);
  const pressHandlers = useLongPress(onLongPressImpl, 300);
  return (
      <button
          className={classNames(styles.orderCardButton, {
            [styles.loading]: isLoading,
          })}
          disabled={isLoading}
          {...pressHandlers}
          onClick={onClickImpl}
      >
        <div className={styles.orderDetails}>

          <div className={styles.coffeeTypeLabel}>
            {cardTitleOfOrder(order)}
          </div>
          {extrasLabel && (<div className={styles.extrasLabel}>{extrasLabel}</div>)}
          <div className={styles.orderStatusLabel}>
            {isLoading
                ? <LoadingIndicator size="small"/>
                : <><OrderStatusLabel status={order.status}/> &nbsp;|&nbsp; {formatDistance(
                    order.createdAt * 1000,
                    new Date(),
                    {addSuffix: true}
                )}</>
            }
          </div>
        </div>
        <div className={styles.userDetails}>
          <img className={styles.userAvatar} src={order.user.avatarUrl} alt=""/>
          <div className={styles.userName}>{order.user.name}</div>
        </div>
      </button>
  );
});

