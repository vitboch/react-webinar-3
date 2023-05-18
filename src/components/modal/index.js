import React from 'react';
import PropTypes from 'prop-types';
import Head from '../head';
import List from '../list';
import {formatMoney} from '../../utils';
import './style.css';

function Modal({list, total, onClose, onDeleteItem}) {
  return (
    <div className='Modal'>
      <Head className='Modal-title' title='Корзина'>
        <div className='Modal-actions'>
          <button onClick={onClose}>Закрыть</button>
        </div>
      </Head>
      <div className='Modal-block'/>
      <List list={list} onAction={onDeleteItem} buttonName='Удалить'/>
      <div className='Modal-total'>
        {total > 0 && (
          <>
            <strong>Итого</strong>
            <strong>{formatMoney(total)}</strong>
          </>
        )}
      </div>
    </div>
  )
}

Modal.propTypes = {
  list: PropTypes.array,
  total: PropTypes.number,
  onClose: PropTypes.func,
  onDeleteItem: PropTypes.func
};

export default React.memo(Modal);
