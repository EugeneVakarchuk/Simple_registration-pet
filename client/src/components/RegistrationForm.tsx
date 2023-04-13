import React, { FC, useState } from 'react';
import AuthService from '../services/AuthService';
import { useAppDispatch } from '../hooks/redux';
import { setSuccesReg } from '../redux/authSlice';
import Input from '../ui/Input';
import Button from '../ui/Button';
import classes from '../styles/comp.module.less'
import Checkbox from '../ui/Checkbox';
import { useNavigate } from 'react-router';

type props = {
  ref?: React.MutableRefObject<undefined>
}

const RegistrationForm: FC<props> = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };


  const registerButton = async () => {
    try {
      const response = await AuthService.registration(email, password);
      if (response) {
        dispatch(setSuccesReg(true))
        navigate('/auth/login')
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
    <div className={classes.form}>
      <div className={classes.formInpudContainer}>
        <div className={classes.formInputWrapper}>
          <Input
            type='text'
            placeholder='example@email.com'
            onChange={handleEmailChange}
            value={email}
            label='Email'
          />
        </div>
        <div className={classes.formInputWrapper}>
          <Input
            type='password'
            placeholder='**********'
            onChange={handlePasswordChange}
            value={password}
            label='Password'
          />
        </div>
        <Checkbox label="I agree to the Terms of Service and Privacy Policy as well as the Cookies Policy." />
      </div>
      <Button onClick={registerButton}>Sing up</Button>
    </div>
  );
};

export default RegistrationForm;