import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

// RequireAuth is hok which checks whether the user is authorized. 
const RequireAuth = ({ children }: any) => {

  // Declare location hook, and isAuth state from redux.
  const location = useLocation();
  const isAuth = useAppSelector(state => state.authReducer.isAuth);

  // If user is not authorized redirect to /auth URL.
  if (!isAuth) {
    return <Navigate to='/auth' state={{ from: location }} />
  }

  // If user is authorized return children component.
  return children;
}

export { RequireAuth };
