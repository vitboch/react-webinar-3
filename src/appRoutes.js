const appRoutes = {
  main: '/',
  product: (productId = ':productId') => `/product/${productId}`
};

export default appRoutes;