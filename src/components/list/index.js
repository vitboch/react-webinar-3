import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List({Item, list, onClick}) {
  return (
    <div className='List'>
      {list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onClick={onClick}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  Item: PropTypes.object,
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onClick: PropTypes.func
}

export default React.memo(List);
