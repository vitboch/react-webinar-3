import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentHead({title, amount}) {
  const cn = bem('CommentHead');

  return <h1 className={cn()}>{title} ({amount})</h1>;
}

CommentHead.propTypes = {
  title: PropTypes.string,
  children: PropTypes.number
};

export default memo(CommentHead);
