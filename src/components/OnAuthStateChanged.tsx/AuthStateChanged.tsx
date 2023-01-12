import { onAuthStateChanged, User } from 'firebase/auth';
import React, { useEffect } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import { CurrentUser } from '../../interfaces/intefaces';
import { setAuth } from '../../redux/authentication/authSlice';
import { registerUserApi } from '../../redux/authentication/userApiCalls';
import useAuth from '../../hooks/useAuth';

const AuthStateChanged = () => {
  const { dispatch } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth: User | null) => {
      if (!userAuth) {
        dispatch(setAuth(null));
      } else {
        registerUserApi(userAuth);
        const currentUser: CurrentUser = {
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          email: userAuth.email,
          photoUrl: userAuth.photoURL
        };
        dispatch(setAuth(currentUser));
      }
    });

    return () => {
      () => unsubscribe();
    };
  }, []);

  return <></>;
};

export default AuthStateChanged;
