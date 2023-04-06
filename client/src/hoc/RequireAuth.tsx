import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

const RequireAuth = ({ children }: any) => {
  const location = useLocation();
  const isAuth = useAppSelector(state => state.authReducer.isAuth);

  if (!isAuth) {
    return <Navigate to='/auth' state={{ from: location }} />
  }

  return children;
}

export { RequireAuth };
