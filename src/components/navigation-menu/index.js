import {memo} from 'react';
import PropTypes from 'prop-types';
import Head from '../head';
import BasketTool from '../basket-tool';
import './style.css';

function NavigationMenu({title, sum, amount, onOpen}) {

  return (
    <>
      <Head title={title}/>
      <BasketTool
        sum={sum}
        amount={amount}
        onOpen={onOpen}/>
    </>
  );
}

NavigationMenu.propTypes = {
  title: PropTypes.string,
  sum: PropTypes.number,
  amount: PropTypes.number,
  onOpen: PropTypes.func,
};

NavigationMenu.defaultProps = {
  sum: 0
}

export default memo(NavigationMenu);
