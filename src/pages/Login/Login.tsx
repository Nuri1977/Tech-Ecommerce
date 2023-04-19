import React, { useEffect } from 'react';
import SignIn from '../../components/SignIn/SignIn';

const Login = () => {
  useEffect(() => {
    document.title = 'Login';
  }, []);

  return (
    <div>
      <SignIn />
    </div>
  );
};

export default Login;
