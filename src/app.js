import React, {useCallback} from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const {list, cart} = store.getState();

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Cart list={cart} onDeleteItem={callbacks.onDeleteItem}/>
      <List
        list={list}
        onAction={callbacks.onAddItem}
        buttonName='Добавить'
      />
    </PageLayout>
  );
}

export default App;
