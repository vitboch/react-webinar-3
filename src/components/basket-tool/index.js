import {memo} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from '../../utils';
import {useTranslation} from '../../store/translator';
import './style.css';

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');
  const { translate } = useTranslation();

  return (
    <div className={cn()}>
      <Link className={cn('link')} to='/'>{translate('home')}</Link>
      <span className={cn('label')}>{translate('inBasket')}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, translate('inBasketItem'))} / ${numberFormat(sum)} ₽`
          : translate('empty')
        }
      </span>
      <button onClick={onOpen}>{translate('goTo')}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
