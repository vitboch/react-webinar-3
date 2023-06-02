import {memo} from 'react';
import PageLayout from '../../components/page-layout';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import Navbar from '../../containers/navbar';

function Main() {

  return (
    <PageLayout>
      <Navbar/>
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
