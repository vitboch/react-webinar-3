import {memo} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {useTranslation} from '../../store/translator';
import './style.css';

function NavigationMenu({navLinks}) {
  const cn = bem('NavigationMenu');
  const {translate} = useTranslation();

  return (
    <ul className={cn()}>
      {navLinks.map((link, index) => (
        <li className={cn('item')} key={index}>
          <Link className={translate(link.title) ? cn('link') : cn('link-black')}
                to={link.path}>{translate(link.title) || link.title}
          </Link>
        </li>))
      }
    </ul>
  );
}

NavigationMenu.propTypes = {
  navLinks: PropTypes.array,
};

NavigationMenu.defaultProps = {
  navLinks: [{title: 'home', path: '/'}]
}

export default memo(NavigationMenu);
