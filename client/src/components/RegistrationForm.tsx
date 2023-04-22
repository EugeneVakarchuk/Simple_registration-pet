import React, { FC, useEffect, useState } from 'react';
import AuthService from '../services/AuthService';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import compStyles from '../styles/comp.module.less'
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import Input from '../ui/Input';
import { setActiveForm } from '../redux/formSlice';
import SubmitButton from '../ui/SubmitButton';
import Checkbox from '../ui/Checkbox';

type props = {
  ref?: React.MutableRefObject<undefined>
}

const RegistrationForm: FC<props> = () => {

  // Declare dispatch and navigate.
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Because default value active form is 'login' after first render, dispatch actual form.
  // It's needed because if going manually to /auth/signup, active form state changes to 'login'.
  useEffect(() => {
    dispatch(setActiveForm('signup'))
  }, [])

  // Decrale type fields.
  type FormValues = {
    username: string
    email: string
    password: string
    confirmPassword: string
    checkbox: boolean
  }

  // Declare useForm hook.
  const {
    register,
    formState: {
      errors,
      isValid
    },
    handleSubmit,
    watch,
    setError,
  } = useForm<FormValues>({
    mode: "onBlur"
  });


  // Submit function in try-catch block.
  const onSubmit = async (data: FormValues) => {
    try {

      // Request response from registration endpoint using username, email and password data from form.
      const response = await AuthService.registration(data.username, data.email, data.password);

      // Check if response is defined.
      if (response) {

        // Dispatch active form to login.
        dispatch(setActiveForm('login'));

        // Redirect to login.
        navigate('/auth/login');
      };


    } catch (error) {

      // Check if response data has error.
      if (error.response) {

        // Receive message and field from response data.
        const { message, field } = error.response.data;

        // Set error and send message depending on the field
        if (field === 'email') {
          setError('email', {
            type: "server",
            message: message,
          })
        }
        if (field === 'username') {
          setError('username', {
            type: "server",
            message: message,
          })
        }
      } else {
        console.log(error);
      };
    };
  };


  return (
    <form className={compStyles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        label='Username'
        placeholder='Your username'
        type='text'
        errors={errors?.username?.message}
        register={register('username', {
          required: 'First name is required',
          minLength: {
            value: 4,
            message: 'Username must be between 4 and 16 characters'
          },
          maxLength: {
            value: 16,
            message: 'Username must be between 4 and 16 characters'
          },
        })}
      />
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
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be between 8 and 16 characters'
          },
          maxLength: {
            value: 16,
            message: 'Password must be between 8 and 16 characters'
          },
        })}
      />
      <Input
        label='Confirm password'
        placeholder='********'
        type='password'
        errors={errors.confirmPassword?.message}
        register={register('confirmPassword', {
          required: 'Password is required',
          validate: (val: string) => {
            if (watch('password') != val) {
              return "Your passwords do no match";
            }
          },
        })}
      />
      <Checkbox
        label='I agree to the Terms of Service and Privacy Policy as well as the Cookies Policy.'
        type='checkbox'
        register={register('checkbox', {
          required: 'You must agree to these rules'
        })}
      />
      <div className={compStyles.loginButtonWrapper}>
        <SubmitButton
          isValid={!isValid}
          text='Sign up'
        />
      </div>
    </form>
  );
};

export default RegistrationForm;