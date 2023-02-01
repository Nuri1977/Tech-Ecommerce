import { useAppSelector } from '../redux/app/hooks';
import { selectProducts } from '../redux/products/productsSlice';

const useProducts = () => {
  const { products, loading, productsError, paginateNext, paginatePrevious } =
    useAppSelector(selectProducts);

  return {
    products,
    loading,
    productsError,
    paginateNext,
    paginatePrevious
  };
};

export default useProducts;
