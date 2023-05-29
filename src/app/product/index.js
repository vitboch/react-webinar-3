import {memo, useCallback, useEffect} from 'react';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import PageLayout from '../../components/page-layout';
import {useParams} from 'react-router-dom';
import CardProduct from '../../components/card-product';
import Loader from '../../components/loader';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';

function Product() {
  const store = useStore();
  const {productId} = useParams()

  useEffect(() => {
    store.actions.product.loadProduct(productId);
  }, [productId]);

  const {amount, sum, product} = useSelector(state => ({
    state: state,
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.product.result,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <PageLayout>
      {product ? (
        <>
          <Head title={product.title}/>
          <BasketTool
            sum={sum}
            amount={amount}
            onOpen={callbacks.openModalBasket}
          />
          <CardProduct
            description={product.description}
            madeInTitle={product.madeIn.title}
            madeInCode={product.madeIn.code}
            category={product.category.title}
            edition={product.edition}
            price={product.price}
            onClick={() => callbacks.addToBasket(product._id)}
          />
        </>
      ) : (<Loader/>)}
    </PageLayout>
  )
}

export default memo(Product);
