import React from 'react';
import PropTypes from 'prop-types';
import {Navigate} from 'react-router-dom';

function ProtectedRoute({isAuth, location = '/', children}) {
  if (!isAuth) return <Navigate to={location}/>;

  return <>{children}</>;
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