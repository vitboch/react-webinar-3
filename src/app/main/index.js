import {memo} from 'react';
import PageLayout from '../../components/page-layout';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import Navbar from '../../containers/navbar';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';

function Main() {
  const store = useStore();

  useInit(() => {
    store.actions.catalog.initParams();
    store.actions.categories.load();
  }, [], true);

  return (
    <PageLayout>
      <Navbar/>
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
