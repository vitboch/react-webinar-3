import {memo, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {pageGenerator} from '../../utils';
import './style.css';

function Pagination({currentPage, pageCount, onPageChange}) {
  const cn = bem('Pagination');
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (currentPage && pageCount) {
      setPages(pageGenerator(currentPage, pageCount))
    }
  }, [currentPage, pageCount])

  if (pageCount === 1 || !pageCount) return null;

  return (
    <div className={cn()}>
      <nav>
        <ul className={cn('list')}>
          {pages.map((page, index) => Number.isInteger(page) ? (
            <li key={index} className={cn('item')}>
              <button
                className={page === currentPage ? cn('link', 'Pagination-active') : cn('link')}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          ) : (<li key={index} className={cn('item')}>{page}</li>))}
        </ul>
      </nav>
    </div>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  pageCount: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

export default memo(Pagination);
