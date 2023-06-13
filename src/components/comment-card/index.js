import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import formatDate from '../../utils/format-data';
import AuthMessage from '../auth-message';
import CommentForm from '../comment-form';

function CommentCard({comment, exists, commentId, lastId, padding, onAnswer, onSignIn, onCancel, onSubmit}) {
  const cn = bem('CommentCard');
  const paddingLeft = `${Math.min(comment.level * 30, 700)}px`;

  const handleClick = () => {
    setTimeout(() => {
      const elementId = exists ? 'my-text-area' : 'my-button';
      document.getElementById(elementId).scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      });
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
          commentId={commentId}
          padding={padding}
          onSignIn={onSignIn}
          onCancel={onCancel}
        />
        : <CommentForm
          title={'Новый ответ'}
          padding={padding}
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
  padding: PropTypes.string,
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
