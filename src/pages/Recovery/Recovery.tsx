import React, { useEffect } from 'react';
import ResetPassword from '../../components/ResetPassword/ResetPassword';

const Reovery = () => {
  useEffect(() => {
    document.title = 'Change password';
  }, []);

  return (
    <div>
      <ResetPassword />
    </div>
  );
};

export default Reovery;
