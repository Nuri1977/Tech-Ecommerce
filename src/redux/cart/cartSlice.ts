import { createSelector, createSlice } from '@reduxjs/toolkit';
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

// =================
// === SELECTORS ===

const selectCartData = (state: RootState) => state.cart;

export const selectCartItems = createSelector([selectCartData], (cartData) => cartData.cartItems);

export const selectCartItemsCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((quantity, cartItem) => quantity + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((amount, cartItem) => amount + cartItem.quantity * cartItem.price, 0)
);

export const { addCartItem, clearCart } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
