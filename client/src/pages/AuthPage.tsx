import React, { FC, useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import { useAppSelector } from '../hooks/redux';
import { Navigate, redirect } from 'react-router-dom';

const AuthPage: FC = () => {

  type selectForm = 'login' | 'registration'

  const [selectedForm, setSelectForm] = useState<selectForm>('login');
  const regSucces = useAppSelector(state => state.authReducer.succesReg);
  const isAuth = useAppSelector(state => state.authReducer.isAuth);

  useEffect(() => {
    if (!isAuth) {
      redirect('/main')
    }
  })

  const buttreg = () => {
    setSelectForm('registration')
  }

  const buttlog = () => {
    setSelectForm('login')
  }

  return (
    <div>
      <button onClick={buttreg}>REG</button>
      <button onClick={buttlog}>LOGIN</button>
      {
        selectedForm === 'login' || regSucces
          ? <LoginForm />
          : <RegistrationForm />
      }
    </div>
  );
};

export default AuthPage;