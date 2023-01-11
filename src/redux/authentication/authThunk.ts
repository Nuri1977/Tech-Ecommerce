import { createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../../firebase/firebaseConfig';

export const signInPopup = createAsyncThunk('users/signInPopup', async () => {
  const response = await signInWithPopup(auth, provider);
  return response.user;
});

export const signOutFun = createAsyncThunk('users/signOutFun', async () => {
  const response = await signOut(auth);
  return response;
});
