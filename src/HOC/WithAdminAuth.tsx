import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const WithAdminAuth = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (!isAdmin) navigate('/');
  }, [isAdmin]);

  return (
    <>
      {isAdmin && <Outlet />}
      {!isAdmin && null}
    </>
  );
};

export default WithAdminAuth;
