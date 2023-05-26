import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import LangSwitcher from '../lang-switcher';
import './style.css';

function Head({title}) {
  const cn = bem('Head');

  return (
    <div className={cn()}>
      <h1 className={cn('title')} data-lang='Head_title'>{title}</h1>
      <LangSwitcher/>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
