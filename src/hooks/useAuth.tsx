import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { selectAuth } from '../redux/authentication/authSlice';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { currentUser, loading, authError, resetPassword } = useAppSelector(selectAuth);

  return {
    currentUser,
    loading,
    authError,
    resetPassword,
    dispatch
  };
};

export default useAuth;
