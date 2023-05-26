import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Loader({sum}) {
  const cn = bem('Loader');
  return (
    <div className={cn()}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

Loader.propTypes = {
  sum: PropTypes.number
};

Loader.defaultProps = {
  sum: 0
}

export default memo(Loader);
