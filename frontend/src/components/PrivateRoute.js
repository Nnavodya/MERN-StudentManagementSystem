// PrivateRoute.js — Protects routes from unauthenticated access
// If no token in localStorage, redirects to /login

import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  // If token exists allow access, otherwise redirect to login
  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;