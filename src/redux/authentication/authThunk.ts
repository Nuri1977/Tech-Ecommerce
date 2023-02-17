import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { auth, provider } from '../../config/firebase/firebaseConfig';
import { registerUserApi } from './userApiCalls';

export const signInPopup = createAsyncThunk('users/signInPopup', async () => {
  const response = await signInWithPopup(auth, provider);
  if (response.user) {
    const res: any = await registerUserApi(response.user);
    return res;
  }
  return response;
});

export const signOutFun = createAsyncThunk('users/signOutFun', async () => {
  const response = await signOut(auth);
  return response;
});

export const signUpEmailPassword = createAsyncThunk(
  'users/signUpEmailPassword',
  async ({
    email,
    password,
    displayName
  }: {
    email: string;
    password: string;
    displayName: string;
  }) => {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    if (response.user) {
      const res: any = await registerUserApi(response.user, { displayName });
      return res;
    }
    return response;
  }
);

export const signInEmailPassword = createAsyncThunk(
  'users/signInEmailPassword',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await signInWithEmailAndPassword(auth, email, password);

    if (response.user) {
      const res: any = await registerUserApi(response.user);
      return res;
    }
    return response;
  }
);

export const sendResetPassword = createAsyncThunk(
  'users/sendResetPassword',
  async (email: string) => {
    const resetConfigSettings = {
      url: 'http://localhost:3000/login'
    };
    const response = await sendPasswordResetEmail(auth, email, resetConfigSettings);
    return response;
  }
);
