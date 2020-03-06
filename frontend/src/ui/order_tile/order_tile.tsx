import { UnreachableError } from 'base/preconditions';
import React from 'react';
import { CoffeeType, Order } from 'services/order/order_dto';
import { getOrderExtrasLabel, getOrderTypeLabel } from 'ui/labels/labels';
import { OrderStatusLabel } from 'ui/order_status_label/order_status_label';
import cappuccino from 'ui/order_tile/assets/cappuccino.jpg';
import espresso from 'ui/order_tile/assets/espresso.jpg';
import flatWhite from 'ui/order_tile/assets/flat_white.jpg';
import hotChocolate from 'ui/order_tile/assets/hot_chocolate.jpg';
import latte from 'ui/order_tile/assets/latte.jpg';
import longBlack from 'ui/order_tile/assets/long_black.jpg';
import matchaLatte from 'ui/order_tile/assets/matcha_latte.jpg';
import mocha from 'ui/order_tile/assets/mocha.jpg';
import styles from './order_tile.module.css';

type RequiredFields = 'cupSize' | 'milkType' | 'extras' | 'coffeeType';
type OptionalFields = 'status';
export type OrderInfo = Pick<Order, RequiredFields> & Partial<Pick<Order, OptionalFields>>;

export const OrderTile = ({
  order,
  showStatus = true,
}: {
  order: OrderInfo,
  showStatus?: boolean,
}) => {
  const extrasLabel = getOrderExtrasLabel(order.extras);
  return (
      <div className={styles.orderTile}>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={imageForType(order.coffeeType)} alt=""/>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.coffeeType}>{getOrderTypeLabel(order)}</div>
          {extrasLabel && (<div className={styles.extrasLabel}>{extrasLabel}</div>)}
          {showStatus && order.status != null && (
              <div className={styles.status}>
                <OrderStatusLabel status={order.status}/>
              </div>
          )}
        </div>
      </div>
  );
};

function imageForType(type: CoffeeType) {
  switch (type) {
    case CoffeeType.CAPPUCCINO:
      return cappuccino;
    case CoffeeType.ESPRESSO:
      return espresso;
    case CoffeeType.FLAT_WHITE:
      return flatWhite;
    case CoffeeType.HOT_CHOC:
      return hotChocolate;
    case CoffeeType.LATTE:
      return latte;
    case CoffeeType.LONG_BLACK:
      return longBlack;
    case CoffeeType.MATCHA:
      return matchaLatte;
    case CoffeeType.MOCHA:
      return mocha;
    default:
      throw new UnreachableError(type);
  }
}
