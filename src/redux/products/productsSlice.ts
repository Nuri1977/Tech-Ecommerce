import {
  addProductApi,
  deleteProductApi,
  fetchProductsApi,
  updateProductApi
} from './productsThunk';
import { createSlice } from '@reduxjs/toolkit';
import { ProductState } from '../../config/interfaces/intefaces';
import { RootState } from '../app/store';

const initialState: ProductState = {
  products: [],
  paginatePrevious: null,
  paginateNext: null,
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
        state.paginatePrevious = null;
        state.paginateNext = null;
        state.productsError = '';
      })
      .addCase(fetchProductsApi.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.paginateNext = action.payload.paginateNext;
        state.loading = false;
        state.productsError = '';
      })
      .addCase(fetchProductsApi.rejected, (state, action) => {
        state.loading = false;
        state.paginatePrevious = null;
        state.paginateNext = null;
        state.productsError = action.error.message;
      })
      .addCase(deleteProductApi.pending, (state) => {
        state.loading = true;
        state.productsError = '';
      })
      .addCase(deleteProductApi.fulfilled, (state, action) => {
        state.products = state.products.filter((item) => item.uid !== action.payload);
        state.loading = false;
        state.productsError = '';
      })
      .addCase(deleteProductApi.rejected, (state, action) => {
        state.loading = false;
        state.productsError = action.error.message;
      })
      .addCase(updateProductApi.pending, (state) => {
        state.loading = true;
        state.productsError = '';
      })
      .addCase(updateProductApi.fulfilled, (state, action) => {
        state.products.forEach((item, index) => {
          if (item.uid === action.payload.uid) state.products[index] = action.payload;
        });
        state.loading = false;
        state.productsError = '';
      })
      .addCase(updateProductApi.rejected, (state, action) => {
        state.loading = false;
        state.productsError = action.error.message;
      });
  }
});

export const { setProducts, clearProductsErrors } = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
