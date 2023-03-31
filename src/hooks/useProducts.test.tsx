import { renderHook } from '@testing-library/react';
import useProducts from './useProducts';
import { useAppSelector as useAppSelectorUntyped } from '../redux/app/hooks';
import { selectProducts } from '../redux/products/productsSlice';

jest.mock('../redux/app/hooks');
jest.mock('../redux/products/productsSlice');
const useAppSelector: jest.Mock = useAppSelectorUntyped as jest.Mock;

describe('useProducts', () => {
  const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 }
  ];
  const loading = false;
  const productsError = null;
  const paginateNext = jest.fn();
  const paginatePrevious = jest.fn();

  beforeEach(() => {
    useAppSelector.mockReturnValue({
      products,
      loading,
      productsError,
      paginateNext,
      paginatePrevious
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns the correct products', () => {
    const { result } = renderHook(() => useProducts());

    expect(result.current.products).toEqual(products);
  });

  it('returns the correct loading state', () => {
    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toEqual(loading);
  });

  it('returns the correct products error', () => {
    const { result } = renderHook(() => useProducts());

    expect(result.current.productsError).toEqual(productsError);
  });

  it('returns the correct paginateNext function', () => {
    const { result } = renderHook(() => useProducts());

    expect(result.current.paginateNext).toEqual(paginateNext);
  });

  it('returns the correct paginatePrevious function', () => {
    const { result } = renderHook(() => useProducts());

    expect(result.current.paginatePrevious).toEqual(paginatePrevious);
  });

  it('uses the selectProducts selector', () => {
    renderHook(() => useProducts());

    expect(useAppSelector).toHaveBeenCalledWith(selectProducts);
  });
});
