import React from 'react';
import PropTypes from 'prop-types';
import {formatMoney} from '../../utils';
import './style.css';

function ItemCart(props) {
  const callback = {
    onClick: (e) => {
      e.stopPropagation();
      props.onClick(props.item.code);
    }
  }

  return (
    <div className='ItemCart'>
      <div className='ItemCart-code'>{props.item.code}</div>
      <div className='ItemCart-title'>{props.item.title}</div>
      <div className='ItemCart-price'>{formatMoney(props.item.price)}</div>
      <div className='ItemCart-count'>{props.item.count} шт</div>
      <div className='ItemCart-actions'>
        <button onClick={callback.onClick}>Удалить</button>
      </div>
    </div>
  );
}

ItemCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  onClick: PropTypes.func,
};

export default React.memo(ItemCart);