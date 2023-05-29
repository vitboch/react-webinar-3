import {memo, useCallback, useEffect} from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import {useTranslation} from '../../store/translator';
import appRoutes from "../../appRoutes";
import NavigationMenu from '../../components/navigation-menu';

function Main() {
  const store = useStore();
  const {translate} = useTranslation()

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    page: state.catalog.page,
    pages: state.catalog.pages,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Выбор страницы
    handleChange: useCallback(page => store.actions.catalog.load(page), [])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} itemLink={appRoutes.product(item._id)} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <NavigationMenu
        title={translate('shop')}
        sum={select.sum}
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
      />
      <List list={select.list} renderItem={renders.item}/>
      <Pagination
        currentPage={select.page}
        pageCount={select.pages}
        onPageChange={callbacks.handleChange}
      />
    </PageLayout>
  );
}

export default memo(Main);
