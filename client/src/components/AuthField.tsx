import React from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

const AuthField = () => {
  return (
    <div>
      <LoginForm />
      <RegistrationForm />
    </div>
  );
};

export default AuthField;