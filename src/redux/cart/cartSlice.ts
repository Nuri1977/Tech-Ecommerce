import { createSlice } from '@reduxjs/toolkit';
import { CartState } from '../../config/interfaces/intefaces';
import { RootState } from '../app/store';
import { addCartQuantity } from './cartUtils';

const initialState: CartState = {
  cartItems: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      addCartQuantity(state, action);
    },
    clearCart: (state) => {
      state.cartItems = [];
    }
  }
});

export const { addCartItem, clearCart } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
