import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '../../interfaces/intefaces';
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
  singUpSuccess: false,
  signUpError: '',
  signUpLoading: false,
  signInError: '',
  signInLoading: false,
  signInPopupError: '',
  signInPopupLoading: false,
  resetPasswordError: '',
  resetPasswordLoading: false,
  resetPassword: '',
  logoutError: ''
};

const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.currentUser = action.payload;
    },
    clearAuthErrors: (state) => {
      state.signUpError = '';
      state.signInError = '';
      state.signInPopupError = '';
      state.logoutError = '';
    }
  },
  extraReducers(builder) {
    builder
      .addCase(signInPopup.pending, (state) => {
        state.signInPopupLoading = true;
        state.signInPopupError = '';
      })
      .addCase(signInPopup.fulfilled, (state, action) => {
        const { uid, displayName, email } = action.payload;
        state.currentUser = {
          uid,
          displayName,
          email
        };
        state.signInPopupLoading = false;
      })
      .addCase(signInPopup.rejected, (state, action) => {
        state.signInPopupError = action.error.message;
        state.signInPopupLoading = false;
      })
      .addCase(signOutFun.fulfilled, (state) => {
        state.currentUser = null;
      })
      .addCase(signOutFun.rejected, (state, action) => {
        state.logoutError = action.error?.message;
      })
      .addCase(signUpEmailPassword.pending, (state) => {
        state.signUpLoading = true;
        state.signUpError = '';
      })
      .addCase(signUpEmailPassword.fulfilled, (state, action) => {
        state.signUpLoading = false;
        const { uid, displayName, email } = action.payload;
        state.currentUser = {
          uid,
          displayName,
          email
        };
      })
      .addCase(signUpEmailPassword.rejected, (state, action) => {
        state.signUpLoading = false;
        state.signUpError = action.error.message;
      })
      .addCase(signInEmailPassword.pending, (state) => {
        state.signInLoading = true;
        state.signInError = '';
      })
      .addCase(signInEmailPassword.fulfilled, (state, action) => {
        state.signInLoading = false;
        const { uid, displayName, email } = action.payload;
        state.currentUser = {
          uid,
          displayName,
          email
        };
      })
      .addCase(signInEmailPassword.rejected, (state, action) => {
        state.signInLoading = false;
        state.signInError = action.error.message;
      })
      .addCase(sendResetPassword.pending, (state) => {
        state.resetPasswordLoading = true;
        state.resetPasswordError = '';
        state.resetPassword = '';
      })
      .addCase(sendResetPassword.fulfilled, (state) => {
        state.resetPasswordLoading = false;
        state.resetPasswordError = '';
        state.resetPassword = 'Email was send successfully';
      })
      .addCase(sendResetPassword.rejected, (state, action) => {
        state.resetPasswordLoading = false;
        state.resetPasswordError = action.error.message;
        state.resetPassword = '';
      });
  }
});

export const { setAuth, clearAuthErrors } = authSlice.actions;

export const selectAuth = (state: RootState) => state.authUser;

export default authSlice.reducer;
