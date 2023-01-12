import { useAppDispatch, useAppSelector } from '../redux/app/hooks';
import { selectAuth } from '../redux/authentication/authSlice';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const {
    currentUser,
    singUpSuccess,
    signUpError,
    signUpLoading,
    signInError,
    signInLoading,
    signInPopupError,
    signInPopupLoading,
    resetPasswordError,
    resetPasswordLoading,
    resetPassword,
    logoutError
  } = useAppSelector(selectAuth);

  return {
    currentUser,
    singUpSuccess,
    signUpError,
    signUpLoading,
    signInError,
    signInLoading,
    signInPopupError,
    signInPopupLoading,
    resetPasswordError,
    resetPasswordLoading,
    resetPassword,
    logoutError,
    dispatch
  };
};

export default useAuth;
