import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ModalLayout from '../modal-layout';
import Head from '../head';
import List from '../list';
import ItemCart from '../item-cart';
import {plural, formatMoney} from '../../utils';
import './style.css';

function Controls({cart, quantity, amount, onClick}) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <div className='Controls'>
        <div className='Controls-title'>
          В корзине:
          <span className='Controls-text'>
            {quantity ? `${quantity} ${plural(quantity, {
              one: 'товар',
              few: 'товара',
              many: 'товаров'
            })} / ${formatMoney(amount)}` : `пусто`}
          </span>
        </div>
        <div className='Controls-actions'>
          <button className='Controls-btn' onClick={() => setIsVisible(true)}>Перейти</button>
        </div>
      </div>
      {isVisible && (
        <ModalLayout className='Modal'>
          <Head className='Modal-title' title='Корзина'>
            <div className='Modal-actions'>
              <button onClick={() => setIsVisible(false)}>Закрыть</button>
            </div>
          </Head>
          <div className='Modal-block'/>
          <List list={cart}
                Item={ItemCart}
                onClick={onClick}/>
          <div className='Modal-amount'>
            {amount > 0 && (
              <>
                <strong>Итого</strong>
                <strong>{formatMoney(amount)}</strong>
              </>
            )}
          </div>
        </ModalLayout>
      )}
    </>
  )
}

Controls.propTypes = {
  cart: PropTypes.array,
  quantity: PropTypes.number,
  amount: PropTypes.number,
  onClick: PropTypes.func
};

export default Controls;
