import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal';
import {plural, formatMoney} from '../../utils';
import './style.css';

function Cart({list, onDeleteItem}) {
  const [isVisible, setIsVisible] = useState(false)
  const total = list.length && list.reduce((acc, item) => acc + item.price * item.count, 0);

  return (
    <>
      <div className='Cart'>
        <div className='Cart-title'>
          В корзине:
          <span className='Cart-text'>
            {list.length ? `${list.length} ${plural(list.length, {
              one: 'товар',
              few: 'товара',
              many: 'товаров'
            })} / ${formatMoney(total)}` : `пусто`}
          </span>
        </div>
        <div className='Cart-actions'>
          <button onClick={() => setIsVisible(true)}>
            Перейти
          </button>
        </div>
      </div>
      {isVisible && (
        <Modal className='Modal'
               list={list}
               total={total}
               onClose={() => setIsVisible(false)}
               onDeleteItem={onDeleteItem}
        />
      )}
    </>
  )
}

Cart.propTypes = {
  list: PropTypes.array,
  onDelete: PropTypes.func
};

export default React.memo(Cart);
