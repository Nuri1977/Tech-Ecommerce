import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '../../config/interfaces/intefaces';
import { RootState } from '../app/store';
import {
  signInEmailPassword,
  signInPopup,
  signOutFun,
  signUpEmailPassword,
  sendResetPassword
} from './authThunk';

const initialState: UserState = {
  currentUser: null,
  loading: false,
  authError: '',
  resetPassword: ''
};

const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.authError = '';
    },
    clearAuthErrors: (state) => {
      state.authError = '';
    }
  },
  extraReducers(builder) {
    builder
      .addCase(signInPopup.pending, (state) => {
        state.loading = true;
        state.authError = '';
      })
      .addCase(signInPopup.fulfilled, (state, action) => {
        const { uid, displayName, email, userRoles } = action.payload;
        state.currentUser = {
          uid,
          displayName,
          email,
          userRoles
        };

        state.loading = false;
      })
      .addCase(signInPopup.rejected, (state, action) => {
        state.authError = action.error.message;
        state.loading = false;
      })
      .addCase(signOutFun.fulfilled, (state) => {
        state.currentUser = null;
        state.loading = false;
        state.authError = '';
      })
      .addCase(signOutFun.rejected, (state, action) => {
        state.authError = action.error?.message;
      })
      .addCase(signUpEmailPassword.pending, (state) => {
        state.loading = true;
        state.authError = '';
      })
      .addCase(signUpEmailPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(signUpEmailPassword.rejected, (state, action) => {
        state.loading = false;
        state.authError = action.error.message;
      })
      .addCase(signInEmailPassword.pending, (state) => {
        state.loading = true;
        state.authError = '';
      })
      .addCase(signInEmailPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(signInEmailPassword.rejected, (state, action) => {
        state.loading = false;
        state.authError = action.error.message;
      })
      .addCase(sendResetPassword.pending, (state) => {
        state.loading = true;
        state.authError = '';
        state.resetPassword = '';
      })
      .addCase(sendResetPassword.fulfilled, (state) => {
        state.loading = false;
        state.authError = '';
        state.resetPassword = 'Email was send successfully';
      })
      .addCase(sendResetPassword.rejected, (state, action) => {
        state.loading = false;
        state.authError = action.error.message;
        state.resetPassword = '';
      });
  }
});

export const { setAuth, clearAuthErrors } = authSlice.actions;

export const selectAuth = (state: RootState) => state.authUser;

export default authSlice.reducer;
