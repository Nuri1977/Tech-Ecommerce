import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '../../interfaces/intefaces';
import { RootState } from '../app/store';
import { signInPopup, signOutFun } from './authThunk';

const initialState: UserState = {
  currentUser: null,
  singUpSuccess: false,
  signUpError: false,
  signUpLoading: false,
  signInError: false,
  signInLoading: false,
  signInPopupError: '',
  signInPopupLoading: false,
  resetPasswordError: false,
  logoutError: '',
  resetPasswordLoading: false
};

const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.currentUser = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(signInPopup.pending, (state) => {
        state.signInPopupLoading = true;
      })
      .addCase(signInPopup.fulfilled, (state, action) => {
        // const { uid, displayName, email } = action.payload;
        const tempUser = {
          uid: action.payload.uid,
          displayName: action.payload.displayName,
          email: action.payload.email
        };
        state.currentUser = tempUser;
        const data2 = JSON.parse(JSON.stringify(tempUser));
        console.log(data2);
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
      });
  }
});

export const { setAuth } = authSlice.actions;

export const selectAuth = (state: RootState) => state.authUser;

export default authSlice.reducer;
