import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { selectAuth } from '../redux/authentication/authSlice';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { currentUser, loading, authError, resetPassword } = useAppSelector(selectAuth);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!currentUser || !Array.isArray(currentUser.userRoles)) {
      setIsAdmin(false);
    } else {
      if (currentUser.userRoles.includes('admin')) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  }, [currentUser]);

  return {
    currentUser,
    isAdmin,
    loading,
    authError,
    resetPassword,
    dispatch
  };
};

export default useAuth;
