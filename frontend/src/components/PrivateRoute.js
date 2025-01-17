import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token || user.role !== role) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
};

export default PrivateRoute;
