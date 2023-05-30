import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from '../../utils';
import {useTranslation} from '../../store/translator';
import NavigationMenu from '../navigation-menu';
import './style.css';

function Item(props) {
  const cn = bem('Item');
  const {translate} = useTranslation();

  const callbacks = {
    onAdd: () => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      <NavigationMenu
        className={cn('menu')}
        navLinks={[{title: `${props.item.title}`, path: `product/${props.item._id}`}]}/>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{translate('add')}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {
  },
}

export default memo(Item);
