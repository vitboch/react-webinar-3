import React from 'react';
import PropTypes from 'prop-types';
import {Navigate} from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import PageLayout from '../page-layout';
import Navbar from '../../containers/navbar';

function ProtectedRoute({isAuth, location = '/', children}) {
  const select = useSelector(state => ({
    waiting: state.user.waiting
  }));

  return (select.waiting
    ? (<PageLayout><Navbar/></PageLayout>)
    : (isAuth ? (<>{children}</>) : (<Navigate to={!select.waiting && location}/>)))
}

ProtectedRoute.propTypes = {
  isAuth: PropTypes.bool,
  location: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default ProtectedRoute;
