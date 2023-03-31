import React, { FC, useState } from 'react';

const LoginForm: FC = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <div>
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
      <button>Login</button>
    </div>
  );
};

export default LoginForm;