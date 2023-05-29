import {Route, Routes} from 'react-router-dom';
import Basket from './basket';
import useSelector from '../store/use-selector';
import appRoutes from '../appRoutes';
import Main from './main';
import Product from './product';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={appRoutes.main} element={<Main/>}/>
        <Route path={appRoutes.product()} element={<Product/>}/>
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
