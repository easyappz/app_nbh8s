import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Spin } from 'antd';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div data-easytag="id1-react/src/components/PrivateRoute.js" className="min-h-screen flex items-center justify-center">
        <Spin data-easytag="id2-react/src/components/PrivateRoute.js" size="large" />
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
