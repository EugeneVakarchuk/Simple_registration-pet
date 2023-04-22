import React, { FC, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import { useAppSelector } from '../hooks/redux';
import { Navigate, redirect } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';


const AuthPage: FC = () => {

  // Get isAuth value from redux store.
  const isAuth = useAppSelector(state => state.authReducer.isAuth);

  // Check if user is logged in and redirect to the /main route.
  useEffect(() => {
    if (!isAuth) {
      redirect('/main');
    };
  }, []);




  return (
    <Routes>
      <Route path='/' element={<AuthLayout />}>
        <Route path='/' element={<Navigate to='login' />} />
        <Route path='login' element={<LoginForm />} />
        <Route path='signup' element={<RegistrationForm />} />
      </Route>
    </Routes>
  );

};


export default AuthPage;