import React, { useEffect } from 'react';
import SignUp from '../../components/SignUp/SignUp';

const Registration = () => {
  useEffect(() => {
    document.title = 'Registration';
  }, []);

  return (
    <div>
      <SignUp />
    </div>
  );
};

export default Registration;
