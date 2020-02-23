export const CustomerRoutes = {
  newOrder(step?: 'select-type' | 'select-size' | 'customize'): string {
    return '/new-order' + (step != null ? '/' + step : '');
  },
  index(): string {
    return '/';
  },
  orderHistory(): string {
    return '/order-history';
  },
};
