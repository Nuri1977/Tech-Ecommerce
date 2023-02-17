import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from '../authentication/authSlice';
import cartSlice from '../cart/cartSlice';
import categoriesSlice from '../categories/categoriesSlice';
import ordersSlice from '../orders/ordersSlice';
import productsSlice from '../products/productsSlice';

export const store = configureStore({
  reducer: {
    authUser: authSlice,
    products: productsSlice,
    categories: categoriesSlice,
    cart: cartSlice,
    orders: ordersSlice
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
