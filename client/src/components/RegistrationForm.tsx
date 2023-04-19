import React, { FC, useState } from 'react';
import AuthService from '../services/AuthService';
import { useAppDispatch } from '../hooks/redux';
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  type FormValues = {
    username: string
    email: string
    password: string
    confirmPassword: string
    checkbox: boolean
  }
  
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

  const onSubmit = async (data:FormValues) => {
    try {
      const response = await AuthService.registration(data.username, data.email, data.password);
      if (response) {
        dispatch(setActiveForm('login'))
        navigate('/auth/login')
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response)
        const { message, field } = error.response.data;
        if(field === 'email') {
          setError('email', {
            type: "server",
            message: message,
          })
        }
        if(field === 'username') {
          setError('username', {
            type: "server",
            message: message,
          })
        }
      } else {
        console.log(error);
      }
    }
  }


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
        register={register('checkbox' , {
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
// import React, { FC, useState } from 'react';
// import AuthService from '../services/AuthService';
// import { useAppDispatch } from '../hooks/redux';
// import { setSuccesReg } from '../redux/authSlice';
// import Input from '../ui/Input';
// import Button from '../ui/Button';
// import compStyles from '../styles/comp.module.less'
// import Checkbox from '../ui/Checkbox';
// import { useNavigate } from 'react-router';

// type props = {
//   ref?: React.MutableRefObject<undefined>
// }

// const RegistrationForm: FC<props> = () => {

//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [username, setUsername] = useState<string>('');
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
  

//   const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(event.target.value);
//   };

//   const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setUsername(event.target.value);
//   };


//   const registerButton = async () => {
//     try {
//       const response = await AuthService.registration(username, email, password);
//       if (response) {
//         dispatch(setSuccesReg(true))
//         navigate('/auth/login')
//       }
//     } catch (e) {
//       if (e.response) {
//         console.log(e.response.data);
//       } else {
//         console.log(e);
//       }
//     }
//   }

//   return (
//     <div className={compStyles.form}>
//       <div className={compStyles.formInputContainer}>
//         <div className={compStyles.formInputWrapper}>
//           <Input
//             type='text'
//             placeholder='Example'
//             onChange={handleUsernameChange}
//             value={username}
//             label='Username'
//           />
//         </div>
//         <div className={compStyles.formInputWrapper}>
//           <Input
//             type='text'
//             placeholder='example@email.com'
//             onChange={handleEmailChange}
//             value={email}
//             label='Email'
//           />
//         </div>
//         <div className={compStyles.formInputWrapper}>
//           <Input
//             type='password'
//             placeholder='**********'
//             onChange={handlePasswordChange}
//             value={password}
//             label='Password'
//           />
//         </div>
//         <Checkbox label="I agree to the Terms of Service and Privacy Policy as well as the Cookies Policy." />
//       </div>
//       <Button onClick={registerButton}>Sing up</Button>
//     </div>
//   );
// };

// export default RegistrationForm;