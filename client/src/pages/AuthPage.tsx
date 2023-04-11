import React, { FC, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import { useAppSelector } from '../hooks/redux';
import { redirect } from 'react-router-dom';
import classes from '../styles/pages.module.less'
import { Routes, Route } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';


const AuthPage: FC = () => {

  const isAuth = useAppSelector(state => state.authReducer.isAuth);

  useEffect(() => {
    if (!isAuth) {
      redirect('/main')
    }
  })




  return (
    <Routes>
      <Route path='/' element={<AuthLayout />}>
        <Route path='login' element={<LoginForm />} />
        <Route path='singup' element={<RegistrationForm />} />
      </Route>
    </Routes>
  );

  // return (
  //   <div>
  //     <div className={classes.toggleWrapper}>
  //       <Toggle onClick={changeFormToLogin}>Login</Toggle>
  //       <Toggle onClick={changeFormToRegistration}>Sing up</Toggle>
  //     </div>
  //     {
  //       selectedForm === 'login' || regSucces
  //         ?
  //         <div>
  //           <LoginForm />
  //         </div>
  //         :
  //         <div>
  //           <RegistrationForm />
  //         </div>
  //     }
  //   </div>
  // );






};


export default AuthPage;