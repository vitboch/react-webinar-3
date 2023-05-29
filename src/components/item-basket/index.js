import {memo} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {numberFormat} from '../../utils';
import {cn as bem} from '@bem-react/classname';
import useStore from '../../store/use-store';
import {useTranslation} from '../../store/translator';
import appRoutes from '../../appRoutes';
import './style.css';

function ItemBasket(props) {
  const store = useStore()
  const cn = bem('ItemBasket');
  const {translate} = useTranslation();

  const callbacks = {
    onRemove: () => props.onRemove(props.item._id)
  };

  return (
    <div className={cn()}>
      <Link to={props.itemLink ?? appRoutes.product(props.item._id)} className={cn('title')}
            onClick={() => store.actions.modals.close()}>{props.item.title}</Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>
          {numberFormat(props.item.amount)} {props.item.amount === 1 ? translate('piece') : translate('pieces')}
        </div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>{translate('delete')}</button>
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onRemove: PropTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {
  },
}

export default memo(ItemBasket);
