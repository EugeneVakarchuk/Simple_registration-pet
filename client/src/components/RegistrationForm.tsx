import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import { useAppDispatch } from '../hooks/redux';
import { setSuccesReg } from '../redux/authSlice';

const RegistrationForm = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const dispatch = useAppDispatch();

  const registerButton = async () => {
    try {
      const response = await AuthService.registration(email, password);
      if (response) {
        dispatch(setSuccesReg(true))
      }
    } catch (e) {
      if (e.response) {
        console.log(e.response.data);
      } else {
        console.log(e);
      }
    }
  }

  return (
    <div>
      <h2>REGISTRATION</h2>
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
      <button onClick={registerButton}>Login</button>
    </div>
  );
};

export default RegistrationForm;