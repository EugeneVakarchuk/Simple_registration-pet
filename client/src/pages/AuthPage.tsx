import React, { FC, useEffect, useRef, useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import { useAppSelector } from '../hooks/redux';
import { redirect } from 'react-router-dom';
import Toggle from '../ui/Toggle';
import classes from '../styles/pages.module.less'


const AuthPage: FC = () => {

  type selectForm = 'login' | 'registration'

  const [selectedForm, setSelectForm] = useState<selectForm>('login');
  const regSucces = useAppSelector(state => state.authReducer.succesReg);
  const isAuth = useAppSelector(state => state.authReducer.isAuth);
  const formRef = useRef();

  useEffect(() => {
    if (!isAuth) {
      redirect('/main')
    }
  })

  const changeFormToLogin = () => {
    setSelectForm('login')
  }

  const changeFormToRegistration = () => {
    setSelectForm('registration')
  }

  return (
    <div>
      <div className={classes.toggleWrapper}>
        <Toggle onClick={changeFormToLogin}>Login</Toggle>
        <Toggle onClick={changeFormToRegistration}>Sing up</Toggle>
      </div>
      {
        selectedForm === 'login' || regSucces
          ? <LoginForm />
          : <RegistrationForm />
      }
    </div>
  );
};


export default AuthPage;