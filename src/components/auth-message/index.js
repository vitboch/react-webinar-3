import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function AuthMessage({text, commentId, onSignIn, onCancel}) {
  const cn = bem('AuthMessage');

  return (
    <div className={commentId === '' ? cn() : cn('card')}>
      <button id={'my-button'} className={cn('btn-2')} onClick={onSignIn}>Войдите</button>
      <span className={cn('span')}>{text}</span>
      {commentId !== '' && <button className={cn('btn-3')} onClick={onCancel}>Отмена</button>}
    </div>
  );
}

AuthMessage.propTypes = {
  text: PropTypes.string,
  commentId: PropTypes.string,
  onSignIn: PropTypes.func,
  onCancel: PropTypes.func
};

AuthMessage.defaultProps = {};

export default memo(AuthMessage);
