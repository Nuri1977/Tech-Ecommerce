import { renderHook } from '@testing-library/react';
import useCategory from './useCategory';

// Mocking the Redux store and selector function for the hook
jest.mock('../redux/app/hooks', () => ({
  useAppSelector: jest.fn()
}));
jest.mock('../redux/categories/categoriesSlice', () => ({
  selectCategories: jest.fn()
}));

describe('useCategory', () => {
  it('returns the expected values when categories are loaded', () => {
    // Mocking the Redux store and selector function return values
    const categories = [
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
      { id: 3, name: 'Category 3' }
    ];
    const loading = false;
    const categoriesError = null;
    const useAppSelectorMock = jest.fn().mockReturnValue({
      categories,
      loading,
      categoriesError
    });
    const selectCategoriesMock = jest.fn().mockReturnValue({
      categories,
      loading,
      categoriesError
    });
    require('../redux/app/hooks').useAppSelector.mockImplementation(useAppSelectorMock);
    require('../redux/categories/categoriesSlice').selectCategories.mockImplementation(
      selectCategoriesMock
    );

    // Calling the hook and checking the return value
    const { result } = renderHook(() => useCategory());
    expect(result.current.categories).toEqual(categories);
    expect(result.current.loading).toBe(loading);
    expect(result.current.categoriesError).toBe(categoriesError);
  });

  it('returns the expected values when categories are not loaded', () => {
    // Mocking the Redux store and selector function return values
    const categories: any[] = [];
    const loading = true;
    const categoriesError = null;
    const useAppSelectorMock = jest.fn().mockReturnValue({
      categories,
      loading,
      categoriesError
    });
    const selectCategoriesMock = jest.fn().mockReturnValue({
      categories,
      loading,
      categoriesError
    });
    require('../redux/app/hooks').useAppSelector.mockImplementation(useAppSelectorMock);
    require('../redux/categories/categoriesSlice').selectCategories.mockImplementation(
      selectCategoriesMock
    );

    // Calling the hook and checking the return value
    const { result } = renderHook(() => useCategory());
    expect(result.current.categories).toEqual(categories);
    expect(result.current.loading).toBe(loading);
    expect(result.current.categoriesError).toBe(categoriesError);
  });
});
