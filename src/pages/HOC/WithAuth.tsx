import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const WithAuth = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) navigate('/login');
  }, [currentUser]);

  return (
    <>
      {currentUser && <Outlet />}
      {!currentUser && null}
    </>
  );
};

export default WithAuth;
