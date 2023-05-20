import React from 'react';
import PropTypes from 'prop-types';
import {formatMoney} from '../../utils';
import './style.css';

function Item(props) {
  const callback = {
    onClick: (e) => {
      e.stopPropagation();
      props.onClick(props.item.code);
    }
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>{props.item.title}</div>
      <div className='Item-price'>{formatMoney(props.item.price)}</div>
      <div className='Item-actions'>
        <button onClick={callback.onClick}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
}

export default React.memo(Item);