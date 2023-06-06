import {memo} from 'react';
import {Link} from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import SideLayout from '../../components/side-layout';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function NavProfile() {
  const store = useStore();
  const cn = bem('NavProfile');

  const userName = useSelector(state => state.user.name);
  const isAuth = useSelector(state => state.user.isAuth);

  const handleChange = () => {
    store.actions.session.signOut();
    store.actions.user.signOut();
  };

  const {t} = useTranslate();

  return (
    <SideLayout className={cn()} border="bottom" side="end" padding="small">
      {userName !== 'undefined' && <Link className={cn('link')} to={'/profile'}>{userName}</Link>}
      {userName ? (
        <button className={cn('btn')} onClick={() => handleChange()}>{t('logout')}</button>
      ) : (
        <Link to={'/login'} onClick={() => store.actions.user.removeError()}>
          <button className={cn('btn')}>{t('login')}</button>
        </Link>
      )}
    </SideLayout>

  );
}

export default memo(NavProfile);
