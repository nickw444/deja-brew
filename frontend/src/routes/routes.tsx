export const Routes = {
  newOrder(step?: 'select-type' | 'select-size' | 'customize'): string {
    return '/new-order' + (step != null ? '/' + step : '');
  },
  login(): string {
    return '/login';
  },
  logout(): string {
    return '/logout';
  },
  orders(): string {
    return '/orders';
  },
  home(): string {
    return '/';
  },
};
