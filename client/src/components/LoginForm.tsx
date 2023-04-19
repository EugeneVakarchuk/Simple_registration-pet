import React, { FC, useState } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { setAuth } from '../redux/authSlice';
import { login } from '../redux/userSlice';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import compStyles from '../styles/comp.module.less'
import Input from '../ui/Input';
import { useForm } from 'react-hook-form';
import SubmitButton from '../ui/SubmitButton';

type props = {
  ref?: React.MutableRefObject<undefined>
}

const LoginForm: FC<props> = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  type FormValues = {
    email: string
    password: string
  }

  const {
    register,
    formState: {
      errors,
      isValid
    },
    handleSubmit,
    setError
  } = useForm<FormValues>({
    mode: "onBlur"
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await AuthService.login(data.email, data.password);
      if (!!response) {
        dispatch(login({
          username: response.data.user.username,
          email: response.data.user.email,
          id: response.data.user._id
        }))
        dispatch(setAuth(true))
        localStorage.setItem('token', response.data.accessToken)
        navigate('/main')
        console.log(response)
      }
    } catch (error) {
      const { message, field } = error.response.data;
      if (field === 'email') {
        setError('email', {
          type: "server",
          message: message,
        });
      }
      if (field === 'password') {
        setError('password', {
          type: "server",
          message: message,
        });
      }
    }
  }

  return (
    <form className={compStyles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={compStyles.formInpudContainer}>
        <Input
          label='Email'
          placeholder='example@email.com'
          type='text'
          errors={errors.email?.message}
          register={register('email', {
            required: 'Email is required',
            pattern: {
              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Please enter a valid email',
            }
          })}
        />
        <Input
          label='Password'
          placeholder='********'
          type='password'
          errors={errors.password?.message}
          register={register('password', {
            required: 'Password is required'
          })}
        />
      </div>
      <div className={compStyles.loginButtonWrapper}>
        <SubmitButton
          isValid={!isValid}
          text='Login'
        />
      </div>
    </form>
  );
};

export default LoginForm;