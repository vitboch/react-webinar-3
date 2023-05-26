import {useRoutes} from 'react-router-dom';
import Basket from './basket';
import useSelector from '../store/use-selector';
import routes from '../routes';
import './style.css';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const elements = useRoutes(routes)
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      {elements}
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
