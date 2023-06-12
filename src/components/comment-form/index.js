import {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentForm({title, commentId, onCancel, onSubmit}) {
  const cn = bem('CommentForm');
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(true);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(newComment.trim());
  };

  const handleChange = e => {
    const text = e.target.value;
    text.trim() === ''
      ? setError(true)
      : setError(false);
    setNewComment(text);
  };

  return (
    <div className={cn()}>
      <form className={commentId === '' ? cn('form') : cn('form-card')} onSubmit={handleSubmit}>
        <div className={cn('title')}>{title}</div>
        <textarea
          id={'my-text-area'}
          className={commentId === '' ? cn('textarea') : cn('textarea-card')}
          value={newComment}
          onChange={handleChange}
        />
        <div className={cn('wrap')}>
          {!error && <button className={cn('btn-1')} type="submit">Отправить</button>}
          {error && <button className={cn('btn-1')} type="submit" disabled>Отправить</button>}
          {commentId !== '' && <button className={cn('btn-2')} type="button" onClick={onCancel}>Отмена</button>}
        </div>
      </form>
    </div>
  );
}

CommentForm.propTypes = {
  title: PropTypes.string,
  commentId: PropTypes.string,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func
};

CommentForm.defaultProps = {};

export default memo(CommentForm);
