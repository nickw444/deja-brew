export const LoginRoutes = {
  index(): string {
    return '/login';
  },

  /**
   * Note: logout is a server-side route and must be navigated to using the browser, rather than
   * the client side router.
   */
  logout(): string {
    return '/logout';
  },
};
