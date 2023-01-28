import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from '../authentication/authSlice';
import categoriesSlice from '../categories/categoriesSlice';
import productsSlice from '../products/productsSlice';

export const store = configureStore({
  reducer: {
    authUser: authSlice,
    products: productsSlice,
    categories: categoriesSlice
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
