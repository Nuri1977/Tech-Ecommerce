import { addOrderApi, deleteOrderApi, fetchOrdersApi } from './ordersThunk';
import { createSlice } from '@reduxjs/toolkit';
import { OrderState } from '../../config/interfaces/intefaces';
import { RootState } from '../app/store';

const initialState: OrderState = {
  orders: [],
  loading: false,
  ordersError: ''
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
      state.ordersError = '';
    },
    clearOrderErrors: (state) => {
      state.ordersError = '';
    }
  },
  extraReducers(builder) {
    builder
      .addCase(addOrderApi.pending, (state) => {
        state.loading = true;
        state.ordersError = '';
      })
      .addCase(addOrderApi.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.loading = false;
        state.ordersError = '';
      })
      .addCase(addOrderApi.rejected, (state, action) => {
        state.loading = false;
        state.ordersError = action.error.message;
      })
      .addCase(fetchOrdersApi.pending, (state) => {
        state.loading = true;
        state.ordersError = '';
      })
      .addCase(fetchOrdersApi.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
        state.ordersError = '';
      })
      .addCase(fetchOrdersApi.rejected, (state, action) => {
        state.loading = false;
        state.ordersError = action.error.message;
      })
      .addCase(deleteOrderApi.pending, (state) => {
        state.loading = true;
        state.ordersError = '';
      })
      .addCase(deleteOrderApi.fulfilled, (state, action) => {
        state.orders = state.orders.filter((item) => item.uid !== action.payload);
        state.loading = false;
        state.ordersError = '';
      })
      .addCase(deleteOrderApi.rejected, (state, action) => {
        state.loading = false;
        state.ordersError = action.error.message;
      });
  }
});

export const { setOrder, clearOrderErrors } = ordersSlice.actions;

export const selectOrders = (state: RootState) => state.orders;

export default ordersSlice.reducer;
