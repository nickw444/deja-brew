import { UnreachableError } from 'base/preconditions';
import * as React from 'react';
import { OrderStatus } from 'services/order/order_dto';

export const OrderStatusLabel = ({ status }: { status: OrderStatus }) => {
  switch (status) {
    case OrderStatus.PENDING:
      return <><Bullet color="orange"/> &nbsp;Pending</>;
    case OrderStatus.ACCEPTED:
      return <><Bullet color="#66C136"/> &nbsp;Accepted</>;
    case OrderStatus.READY:
      return <><Checkmark color="#66C136"/> &nbsp;Ready</>;
    case OrderStatus.CANCELLED:
      return <><Cross color="red"/> &nbsp;Cancelled</>;
    default:
      throw new UnreachableError(status);
  }
};

const Bullet = ({ color }: { color: string }) => (<span style={{ color }}>◉</span>);
const Checkmark = ({ color }: { color: string }) => (<span style={{ color }}>✓</span>);
const Cross = ({ color }: { color: string }) => (<span style={{ color }}>✖</span>);
