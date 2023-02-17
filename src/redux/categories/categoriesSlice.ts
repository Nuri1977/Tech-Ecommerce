import {
  addCategoryApi,
  deleteCategoryApi,
  fetchCategoriesApi,
  updateCategoryApi
} from './categoriesThunk';
import { createSlice } from '@reduxjs/toolkit';
import { CategoryState } from '../../config/interfaces/intefaces';
import { RootState } from '../app/store';

const initialState: CategoryState = {
  categories: [],
  loading: false,
  categoriesError: ''
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
      state.categoriesError = '';
    },
    clearCategoryErrors: (state) => {
      state.categoriesError = '';
    }
  },
  extraReducers(builder) {
    builder
      .addCase(addCategoryApi.pending, (state) => {
        state.loading = true;
        state.categoriesError = '';
      })
      .addCase(addCategoryApi.fulfilled, (state, action) => {
        state.categories.push(action.payload);
        state.loading = false;
        state.categoriesError = '';
      })
      .addCase(addCategoryApi.rejected, (state, action) => {
        state.loading = false;
        state.categoriesError = action.error.message;
      })
      .addCase(fetchCategoriesApi.pending, (state) => {
        state.loading = true;
        state.categoriesError = '';
      })
      .addCase(fetchCategoriesApi.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
        state.categoriesError = '';
      })
      .addCase(fetchCategoriesApi.rejected, (state, action) => {
        state.loading = false;
        state.categoriesError = action.error.message;
      })
      .addCase(deleteCategoryApi.pending, (state) => {
        state.loading = true;
        state.categoriesError = '';
      })
      .addCase(deleteCategoryApi.fulfilled, (state, action) => {
        state.categories = state.categories.filter((item) => item.uid !== action.payload);
        state.loading = false;
        state.categoriesError = '';
      })
      .addCase(deleteCategoryApi.rejected, (state, action) => {
        state.loading = false;
        state.categoriesError = action.error.message;
      })
      .addCase(updateCategoryApi.pending, (state) => {
        state.loading = true;
        state.categoriesError = '';
      })
      .addCase(updateCategoryApi.fulfilled, (state, action) => {
        state.categories.forEach((item, index) => {
          if (item.uid === action.payload.uid) state.categories[index] = action.payload;
        });
        state.loading = false;
        state.categoriesError = '';
      })
      .addCase(updateCategoryApi.rejected, (state, action) => {
        state.loading = false;
        state.categoriesError = action.error.message;
      });
  }
});

export const { setCategory, clearCategoryErrors } = categoriesSlice.actions;

export const selectCategories = (state: RootState) => state.categories;

export default categoriesSlice.reducer;
