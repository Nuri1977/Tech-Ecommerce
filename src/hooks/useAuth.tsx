import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { selectAuth } from '../redux/authentication/authSlice';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { currentUser, loading, authError, resetPassword } = useAppSelector(selectAuth);
  let isAdmin;

  if (!currentUser || !Array.isArray(currentUser.userRoles)) {
    isAdmin = false;
  } else {
    if (currentUser.userRoles.includes('admin')) {
      isAdmin = true;
    } else {
      isAdmin = false;
    }
  }

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
