import React, {useCallback} from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Item from './components/item';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const {list} = store.getState();
  const cart = store.getItem()
  const quantity = store.getQuantity()
  const amount = store.getAmount()

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
      <Controls cart={cart} quantity={quantity} amount={amount} onClick={callbacks.onDeleteItem}/>
      <List list={list} Item={Item} onClick={callbacks.onAddItem}/>
    </PageLayout>
  );
}

export default App;
