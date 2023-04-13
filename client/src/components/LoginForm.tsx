import React, { FC, useState } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { setAuth } from '../redux/authSlice';
import { login } from '../redux/userSlice';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import classes from '../styles/comp.module.less'
import Input from '../ui/Input';

type props = {
  ref?: React.MutableRefObject<undefined>
}

const LoginForm: FC<props> = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginButtton = async () => {
    const response = await AuthService.login(email, password);
    if (!!response) {
      dispatch(login({
        email: response.data.user.email,
        id: response.data.user._id
      }))
      dispatch(setAuth(true))
      localStorage.setItem('token', response.data.accessToken)
      navigate('/main')
    }
  }

  return (
    <div className={classes.form}>
      <div className={classes.formInpudContainer}>
        <div className={classes.formInputWrapper}>
          <Input
            type='text'
            placeholder='example@email.com'
            onChange={e => setEmail(e.target.value)}
            value={email}
            label='Email'
          />
        </div>
        <div className={classes.formInputWrapper}>
          <Input
            type='password'
            placeholder='**********'
            onChange={e => setPassword(e.target.value)}
            value={password}
            label='Password'
          />
        </div>
      </div>
      <Button onClick={loginButtton}>Login</Button>
    </div>
  );
};

export default LoginForm;