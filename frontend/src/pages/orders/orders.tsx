import classNames from 'classnames';
import { formatDistance } from 'date-fns';
import * as mobxReact from 'mobx-react';
import { OrderCardStore } from 'pages/orders/orders_presenter';
import * as React from 'react';
import { useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';
import { OrderStatus } from 'services/order/order_dto';
import { CoffeeIcon } from 'ui/icons/icons';
import { cardTitleOfOrder, extrasLabelOfOrder } from 'ui/labels/labels';
import { LoadingIndicator } from 'ui/loading_indicator/loading_indicator';
import { StatusPanel } from 'ui/status_panel/status_panel';
import styles from './orders.module.css';

export class OrdersPage extends React.PureComponent<{
  OrdersGrid: React.ComponentType,
  isLoading: boolean,
  isEmpty: boolean,
  onMount(): void
  onWillUnmount(): void
}> {
  componentDidMount() {
    this.props.onMount();
  }

  componentWillUnmount() {
    this.props.onWillUnmount();
  }

  render() {
    const {
      OrdersGrid,
      isLoading,
      isEmpty,
    } = this.props;
    return (
        <div className={styles.ordersPage}>
          {isLoading && (
              <StatusPanel Icon={LoadingIndicator}>
                Loading...
              </StatusPanel>
          )}
          {isEmpty && !isLoading && (
              <StatusPanel Icon={CoffeeIcon}>
                There are no more active orders.
              </StatusPanel>
          )}
          {!isEmpty && !isLoading && <OrdersGrid/>}
        </div>
    );
  }
}

const transitionClassNames: CSSTransitionClassNames = {
  enter: styles.gridItemEnter,
  enterActive: styles.gridItemEnterActive,
  exitActive: styles.gridItemExitActive,
};

export const OrdersGrid = React.memo(({
  cards,
  onOrderCardClick,
  onOrderCardLongPress,
}: {
  cards: OrderCardStore[],
  onOrderCardClick(order: OrderCardStore): void,
  onOrderCardLongPress(order: OrderCardStore): void,
}) => (
    <TransitionGroup className={styles.ordersGrid} >
      {cards.map((card) => (
          <CSSTransition
              key={card.order.id}
              timeout={300}
              classNames={transitionClassNames}
          >
            <OrderCard
                key={card.order.id}
                store={card}
                onClick={onOrderCardClick}
                onLongPress={onOrderCardLongPress}
            />
          </CSSTransition>
      ))}
    </TransitionGroup>
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

const statusLabels: Record<OrderStatus, string> = {
  [OrderStatus.ACCEPTED]: 'accepted',
  [OrderStatus.CANCELLED]: 'cancelled',
  [OrderStatus.PENDING]: 'pending',
  [OrderStatus.READY]: 'ready',
};

const statusStyles: Record<OrderStatus, string | undefined> = {
  [OrderStatus.ACCEPTED]: styles.stateAccepted,
  [OrderStatus.CANCELLED]: undefined,
  [OrderStatus.PENDING]: styles.statePending,
  [OrderStatus.READY]: undefined,
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
  const relativeOrderTime = formatDistance(order.createdAt * 1000, new Date(), { addSuffix: true });
  return (
      <button
          className={classNames(styles.orderCardButton, statusStyles[order.status])}
          disabled={isLoading}
          {...pressHandlers}
          onClick={onClickImpl}
      >
        <div className={styles.orderDetails}>
          <div className={styles.coffeeTypeLabel}>
            <div className={classNames(styles.loadingContainer, isLoading && styles.visible)}>
              <div className={styles.loadingIndicator}>
                <LoadingIndicator size="small"/>
              </div>
            </div>
            <div className={classNames(styles.cardTitleContainer, isLoading && styles.offset)}>
              {cardTitleOfOrder(order)}
            </div>
          </div>
          {extrasLabel && (<div className={styles.extrasLabel}>{extrasLabel}</div>)}
          <div className={styles.orderStatusLabel}>
            <span>{relativeOrderTime}</span>
            <span className={styles.orderStatusLabelDivider}>|</span>
            <span>{statusLabels[order.status]}</span>
          </div>
        </div>
        <div className={styles.userDetails}>
          <img className={styles.userAvatar} src={order.user.avatarUrl} alt=""/>
          <div className={styles.userName}>{order.user.name}</div>
        </div>
      </button>
  );
});

