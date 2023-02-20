import { addUserApi, deleteUserApi, fetchUsersApi, updateUserApi } from './usersThunk';
import { createSlice } from '@reduxjs/toolkit';
import { UsersState } from '../../config/interfaces/intefaces';
import { RootState } from '../app/store';

const initialState: UsersState = {
  users: [],
  paginateNext: null,
  loading: false,
  usersError: ''
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.usersError = '';
    },
    clearUsersErrors: (state) => {
      state.usersError = '';
    }
  },
  extraReducers(builder) {
    builder
      .addCase(addUserApi.pending, (state) => {
        state.loading = true;
        state.usersError = '';
      })
      .addCase(addUserApi.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.loading = false;
        state.usersError = '';
      })
      .addCase(addUserApi.rejected, (state, action) => {
        state.loading = false;
        state.usersError = action.error.message;
      })
      .addCase(fetchUsersApi.pending, (state) => {
        state.loading = true;
        state.paginateNext = null;
        state.usersError = '';
      })
      .addCase(fetchUsersApi.fulfilled, (state, action) => {
        state.users = action.payload.users;
        state.paginateNext = action.payload.paginateNext;
        state.loading = false;
        state.usersError = '';
      })
      .addCase(fetchUsersApi.rejected, (state, action) => {
        state.loading = false;
        state.paginateNext = null;
        state.usersError = action.error.message;
      })
      .addCase(deleteUserApi.pending, (state) => {
        state.loading = true;
        state.usersError = '';
      })
      .addCase(deleteUserApi.fulfilled, (state, action) => {
        state.users = state.users.filter((item) => item.uid !== action.payload);
        state.loading = false;
        state.usersError = '';
      })
      .addCase(deleteUserApi.rejected, (state, action) => {
        state.loading = false;
        state.usersError = action.error.message;
      })
      .addCase(updateUserApi.pending, (state) => {
        state.loading = true;
        state.usersError = '';
      })
      .addCase(updateUserApi.fulfilled, (state, action) => {
        if (action.payload) {
          state.users.forEach((item, index) => {
            if (item.uid === action.payload?.uid) state.users[index] = action.payload;
          });
          state.loading = false;
          state.usersError = '';
        }
      })
      .addCase(updateUserApi.rejected, (state, action) => {
        state.loading = false;
        state.usersError = action.error.message;
      });
  }
});

export const { setUsers, clearUsersErrors } = usersSlice.actions;

export const selectUsres = (state: RootState) => state.users;

export default usersSlice.reducer;
