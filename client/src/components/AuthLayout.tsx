import React, { FC } from 'react';
import Toggle from '../ui/Toggle';
import classes from '../styles/ui.module.less';
import { Outlet, useNavigate } from 'react-router';

type props = {

}

const AuthLayout: FC<props> = (props) => {

  const navigate = useNavigate();

  const changeFormToLogin = () => {
    navigate('login')
  }

  const changeFormToRegistration = () => {
    navigate('singup')
  }

  return (
    <div>
      <div className={classes.toggleWrapper}>
        <Toggle onClick={changeFormToLogin}>Login</Toggle>
        <Toggle onClick={changeFormToRegistration}>Sing up</Toggle>
      </div>
      <>
        <Outlet />
      </>
    </div>
  );
};

export default AuthLayout;