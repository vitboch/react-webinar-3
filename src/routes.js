import Main from './app/main';
import Product from './app/product';

const routes = [
  {
    path: '/',
    element: <Main/>,
  },
  {
    path: 'product/:productId',
    element: <Product/>,
  }
];

export default routes;