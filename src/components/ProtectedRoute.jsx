import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

/**
 * Route protection wrapper.
 * Checks for existence of jwt_token in Cookies.
 * @param {Object} props
 * @param {boolean} [props.redirectIfAuthenticated] - Set true for pages like Login that logged-in users shouldn't see
 */
export const ProtectedRoute = ({ redirectIfAuthenticated = false }) => {
  const token = Cookies.get('jwt_token');

  if (redirectIfAuthenticated) {
    // Authenticated users visiting /login must redirect to /
    return token ? <Navigate to="/" replace /> : <Outlet />;
  }

  // Protected routes check: If token is missing, redirect to /login
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
