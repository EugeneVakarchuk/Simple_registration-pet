import React from 'react';
import { useAppDispatch } from '../hooks/redux';
import { setAuth } from '../redux/authSlice';
import { logout } from '../redux/userSlice';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutButton = () => {
    dispatch(logout());
    dispatch(setAuth(false));
    localStorage.removeItem('token');
    AuthService.logout();
    navigate('/', { replace: true })
  }



  return (
    <div>
      <button onClick={logoutButton}>logout</button>
    </div>
  );
};

export default MainPage;