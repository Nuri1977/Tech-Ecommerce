import { addProductApi, fetchProductsApi } from './prouctsThunk';
import { createSlice } from '@reduxjs/toolkit';
import { ProductState } from '../../config/interfaces/intefaces';
import { RootState } from '../app/store';

const initialState: ProductState = {
  products: [],
  loading: false,
  productsError: ''
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.productsError = '';
    },
    clearProductsErrors: (state) => {
      state.productsError = '';
    }
  },
  extraReducers(builder) {
    builder
      .addCase(addProductApi.pending, (state) => {
        state.loading = true;
        state.productsError = '';
      })
      .addCase(addProductApi.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.loading = false;
        state.productsError = '';
      })
      .addCase(addProductApi.rejected, (state, action) => {
        state.loading = false;
        state.productsError = action.error.message;
      })
      .addCase(fetchProductsApi.pending, (state) => {
        state.loading = true;
        state.productsError = '';
      })
      .addCase(fetchProductsApi.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.productsError = '';
      })
      .addCase(fetchProductsApi.rejected, (state, action) => {
        state.loading = false;
        state.productsError = action.error.message;
      });
  }
});

export const { setProducts, clearProductsErrors } = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
