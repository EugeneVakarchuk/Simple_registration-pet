import React from 'react';
import { useAppDispatch } from '../hooks/redux';
import { setAuth } from '../redux/authSlice';
import { logout } from '../redux/userSlice';
import AuthService from '../services/AuthService';

const MainPage = () => {

  const dispatch = useAppDispatch();

  const logoutButton = () => {
    dispatch(logout());
    dispatch(setAuth(false));
    localStorage.removeItem('token');
    AuthService.logout();
  }

  return (
    <div>
      <button onClick={logoutButton}>logout</button>
    </div>
  );
};

export default MainPage;