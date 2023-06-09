import {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentForm({title, commentId, placeholder, onCancel, onSubmit}) {
  const cn = bem('CommentForm');
  const [newComment, setNewComment] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(newComment);
  };

  return (
    <div className={cn()}>
      <form className={commentId === '' ? cn('form') : cn('form-card')} onSubmit={handleSubmit}>
        <div className={cn('title')}>{title}</div>
        <textarea
          className={commentId === '' ? cn('textarea') : cn('textarea-card')}
          placeholder={placeholder}
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
        />
        <div className={cn('wrap')}>
          <button className={cn('btn-1')} type="submit">Отправить</button>
          {commentId !== '' && <button className={cn('btn-2')} type="button" onClick={onCancel}>Отмена</button>}
        </div>
      </form>
    </div>
  );
}

CommentForm.propTypes = {
  title: PropTypes.string,
  commentId: PropTypes.string,
  placeholder: PropTypes.string,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func
};

CommentForm.defaultProps = {};

export default memo(CommentForm);
