import { CartItem, CartState } from '../../config/interfaces/intefaces';

export const addCartQuantity = (state: CartState, action: any) => {
  const { payload }: { payload: CartItem } = action;
  const test = state.cartItems.find((item) => item.uid === payload.uid);
  if (test) {
    state.cartItems.map((item) => {
      if (item.uid === payload.uid) item.quantity = item.quantity + 1;
    });
  } else {
    state.cartItems.push({ ...payload, quantity: 1 });
  }
};
