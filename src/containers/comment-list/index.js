import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import useSelector from '../../hooks/use-selector';
import {useSelector as useSelectorRedux} from 'react-redux/es/hooks/useSelector';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import {useNavigate} from 'react-router-dom';
import commentsActions from '../../store-redux/comments/actions';
import Spinner from '../../components/spinner';
import CommentHead from '../../components/comment-head';
import CommentCard from '../../components/comment-card';
import AuthMessage from '../../components/auth-message';
import CommentForm from '../../components/comment-form';

function CommentList({articleId}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [commentId, setCommentId] = useState('');
  const [lastId, setLastId] = useState(undefined);

  const {data, waiting} = useSelectorRedux(state => ({
    data: state.comments.data,
    waiting: state.comments.waiting
  }));

  const {exists} = useSelector(state => state.session);

  const comments = useMemo(() => {
    if (data) {
      const tree = data.map(item => {
        if (item.parent._type === 'article') return {...item, parent: null};
        return item;
      });

      return treeToList(listToTree(tree), (item, level) => ({
        id: item._id,
        date: item['dateCreate'],
        author: item.author.profile.name,
        text: item.text,
        level,
        exists
      }));
    }
  }, [data]);


  let currentId;
  const ids = data?.filter(comment => comment.parent._id === commentId);
  if (ids) {
    currentId = ids.length ? ids[ids.length - 1]?._id : commentId;
  }

  useEffect(() => {
    setLastId(currentId);
  }, [currentId]);


  const callbacks = {
    onAnswer: useCallback(comment => {
      setCommentId(comment.id);
    }, [commentId]),

    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),

    onCancel: useCallback(() => {
      setCommentId('');
    }, [commentId]),

    onSubmitArticle: useCallback(text => {
      dispatch(commentsActions.add(articleId, 'article', text, () => {
        setCommentId('');
        setLastId('');
      }));
    }, [dispatch, commentId]),

    onSubmitComment: useCallback(text => {
      dispatch(commentsActions.add(commentId, 'comment', text, () => {
        setCommentId('');
        setLastId('');
      }));
    }, [dispatch, commentId])

  };

  return (
    <Spinner active={waiting}>
      <CommentHead title={'Комментарии'} amount={!!comments ? comments.length : 0}/>
      {comments && comments.map((comment, index) =>
        <CommentCard
          key={index}
          comment={comment}
          exists={exists}
          commentId={commentId}
          lastId={lastId}
          onAnswer={callbacks.onAnswer}
          onSignIn={callbacks.onSignIn}
          onCancel={callbacks.onCancel}
          onSubmit={callbacks.onSubmitComment}
        />)}
      {commentId === '' && (!exists
        ? <AuthMessage
          text={', чтобы иметь возможность комментировать'}
          onSignIn={callbacks.onSignIn}
          commentId={commentId}
        />
        : <CommentForm
          title={'Новый комментарий'}
          commentId={commentId}
          onSubmit={callbacks.onSubmitArticle}
        />)}
    </Spinner>
  );
}

CommentList.propTypes = {
  articleId: PropTypes.string.isRequired
};

export default memo(CommentList);
