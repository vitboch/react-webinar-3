import {memo} from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import SideLayout from '../../components/side-layout';
import Input from '../input';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function LoginForm() {
  const store = useStore();
  const {t} = useTranslate();
  const cn = bem('LoginForm');
  const error = useSelector(state => state.user.error);

  console.log('error', error);

  const handleSubmit = (e) => {
    e.preventDefault();
    const [loginNode, passwordNode] = e.target;
    store.actions.user.signIn({login: loginNode.value, password: passwordNode.value});
  };

  return (
    <SideLayout side={'start'} padding={'medium'}>
      <form className={cn()} onSubmit={handleSubmit}>
        <h2 className={cn('title')}>{t('signIn')}</h2>
        <label className={cn('label')} htmlFor={'login'}>{t('userLogin')}</label>
        <Input type={'text'} theme={'form'} name={'login'} id={'login'} value={''}/>
        <label className={cn('label')} htmlFor={'password'}>{t('password')}</label>
        <Input type={'text'} theme={'form'} name={'password'} id={'password'} value={''}/>
        {error && (<div>
          <p className={cn('description')}>{error}</p>
        </div>)}
        <div className={cn('wrap')}>
          <button type="submit" className={cn('btn')}>{t('signIn')}</button>
        </div>
      </form>
    </SideLayout>

  );
}

export default memo(LoginForm);
