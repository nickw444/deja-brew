import * as React from 'react';
import { useEffect } from 'react';
import { Order } from 'services/order/order_service_objects';
import { OrderCard } from './order_card';
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

export const OrdersGrid = React.memo(({ orders }: { orders: Order[] }) => (
    <div className={styles.ordersGrid}>
      {orders.map((order) => (
          <OrderCard key={order.id} order={order}/>
      ))}
    </div>
));

