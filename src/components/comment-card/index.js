import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import formatDate from '../../utils/format-data';
import AuthMessage from '../auth-message';
import CommentForm from '../comment-form';

function CommentCard({comment, exists, commentId, lastId, onAnswer, onSignIn, onCancel, onSubmit}) {
  const cn = bem('CommentCard');
  const paddingLeft = `${Math.min(comment.level * 30, 700)}px`;

  const handleClick = () => {
    setTimeout(() => {
      exists
        ? document.getElementById('my-text-area').focus()
        : document.getElementById('my-button').focus();
    }, 1);
    onAnswer(comment);
  };

  return (
    <div className={cn()} style={{paddingLeft}}>
      <div className={cn('wrap')}>
        <h3 className={cn('title')}>{comment.author}</h3>
        <span className={cn('title-span')}>{formatDate(comment.date)}</span>
      </div>
      <p className={cn('description')}>{comment.text}</p>
      <button className={cn('btn-1')} onClick={handleClick}>Ответить</button>
      {lastId === comment.id && (!exists
        ? <AuthMessage
          text={', чтобы иметь возможность ответить. '}
          onSignIn={onSignIn}
          commentId={commentId}
          onCancel={onCancel}
        />
        : <CommentForm
          title={'Новый ответ'}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />)}
    </div>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.object.isRequired,
  exists: PropTypes.bool.isRequired,
  commentId: PropTypes.string.isRequired,
  lastId: PropTypes.string,
  onAnswer: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

CommentCard.defaultProps = {
  onAdd: () => {
  }
};

export default memo(CommentCard);
