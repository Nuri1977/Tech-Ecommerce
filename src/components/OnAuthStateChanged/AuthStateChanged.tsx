import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useEffect } from 'react';
import { auth } from '../../config/firebase/firebaseConfig';
import { setAuth } from '../../redux/authentication/authSlice';
import { registerUserApi } from '../../redux/authentication/userApiCalls';
import useAuth from '../../hooks/useAuth';

const AuthStateChanged = ({
  setIsLoading
}: {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { dispatch } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth: User | null) => {
      if (!userAuth) {
        dispatch(setAuth(null));
        setIsLoading(false);
      } else {
        registerUserApi(userAuth)
          .then((res) => {
            dispatch(setAuth(res));
          })
          .catch((err) => console.log(err))
          .finally(() => setIsLoading(false));
      }
    });

    return () => {
      () => unsubscribe();
    };
  }, []);

  return <></>;
};

export default AuthStateChanged;
