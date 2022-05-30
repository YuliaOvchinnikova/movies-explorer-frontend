import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ authorized, children }) => {
  if (!authorized) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
