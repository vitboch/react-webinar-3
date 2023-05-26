import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from '../../utils';
import {useTranslation} from '../../store/translator';
import './style.css';

function CardProduct({description, madeInTitle, madeInCode, category, edition, price, onClick}) {
  const cn = bem('CardProduct');
  const {translate} = useTranslation();

  return (
    <div className={cn()}>
      <span className={cn('descr')}>{description}</span>
      <span className={cn('descr')}>Страна производитель: <strong>{madeInTitle} ({madeInCode})</strong></span>
      <span className={cn('descr')}>Категория: <strong>{category}</strong></span>
      <span className={cn('descr')}>Год выпуска: <strong>{edition}</strong></span>
      <span className={cn('price')}>Цена: {numberFormat(price, 'ru-RU', {
          style: 'currency',
          currency: 'RUB',
        },
      )}
      </span>
      <div>
        <button className={cn('btn')} onClick={onClick}>{translate('add')}</button>
      </div>
    </div>
  );
}

CardProduct.propTypes = {
  description: PropTypes.string,
  madeInTitle: PropTypes.string,
  madeInCode: PropTypes.string,
  category: PropTypes.string,
  edition: PropTypes.number,
  price: PropTypes.number,
  onClick: PropTypes.func
};

CardProduct.defaultProps = {
  sum: 0
}

export default memo(CardProduct);
