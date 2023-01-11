import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { auth, provider } from '../../firebase/firebaseConfig';

export const signInPopup = createAsyncThunk('users/signInPopup', async () => {
  const response = await signInWithPopup(auth, provider);
  return response.user;
});

export const signOutFun = createAsyncThunk('users/signOutFun', async () => {
  const response = await signOut(auth);
  return response;
});

export const signUpEmailPassword = createAsyncThunk(
  'users/signUpEmailPassword',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    return response.user;
  }
);

export const signInEmailPassword = createAsyncThunk(
  'users/signInEmailPassword',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response.user;
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
