import React, { FC, useState } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { setAuth } from '../redux/authSlice';
import { login } from '../redux/userSlice';
import AuthService from '../services/AuthService';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm: FC = () => {

  const [email, setEmail] = useState<string>('asjgldsflk@ds.com');
  const [password, setPassword] = useState<string>('fdsadigkdssdf');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const loginButtton = async () => {
    const response = await AuthService.login(email, password);
    if (!!response) {
      dispatch(login({
        email: response.data.user.email,
        id: response.data.user.id
      }))
      dispatch(setAuth(true))
      localStorage.setItem('token', response.data.accessToken)
      navigate('/main')
    }
  }

  return (
    <div>
      <h2>LOGIN</h2>
      <input
        type='text'
        placeholder='Email'
        onChange={e => setEmail(e.target.value)}
        value={email}
      />
      <input
        type='password'
        placeholder='Password'
        onChange={e => setPassword(e.target.value)}
        value={password}
      />
      <Link to={'main'} onClick={loginButtton}>Login</Link>
    </div>
  );
};

export default LoginForm;