import {Routes, Route} from 'react-router-dom';
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile';
import ProtectedRoute from '../components/protected-route';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();
  const activeModal = useSelector(state => state.modals.name);

  useInit(() => {
    store.actions.catalog.initParams();
    store.actions.user.getInfo();
    store.actions.categories.load();
  }, [], true);

  const isAuth = useSelector(state => state.user.isAuth);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        <Route path={'/login'}
               element={<ProtectedRoute isAuth={!isAuth} location={'/profile'}><Login/></ProtectedRoute>}
        />
        <Route path={'/profile'}
               element={<ProtectedRoute isAuth={isAuth} location={'/login'}><Profile/></ProtectedRoute>}
        />
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
