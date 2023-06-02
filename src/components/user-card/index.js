import {memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import SideLayout from '../side-layout';
import Spinner from '../spinner';
import './style.css';

function UserCard({user, t}) {
  const cn = bem('UserCard');

  return (
    <Spinner active={user.waiting}>
      <SideLayout className={cn()} side={'start'} padding={'medium'}>
        <div className={cn('wrap')}>
          <h2 className={cn('title')}>{t('profile')}</h2>
          <p className={cn('description')}><span className={cn('span')}>{t('name')} <b>{user.name}</b></span></p>
          <p className={cn('description')}><span className={cn('span')}>{t('phone')} <b>{user.phone}</b></span></p>
          <p className={cn('description')}><span className={cn('span')}>{t('email')} <b>{user.email}</b></span></p>
        </div>
      </SideLayout>
    </Spinner>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    waiting: PropTypes.bool
  }).isRequired,
  t: PropTypes.func
};

UserCard.defaultProps = {
  t: (text) => text
};

export default memo(UserCard);
