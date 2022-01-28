import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// import { Spinner } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading } = useAuth();
    let location = useLocation();
    if (isLoading) { return <>
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        >
          <span className="visually-hidden"></span>
        </div>
      </> }
    if (user.email) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;