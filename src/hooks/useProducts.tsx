import { useAppSelector } from '../redux/app/hooks';
import { selectProducts } from '../redux/products/productsSlice';

const useProducts = () => {
  const { products, loading, productsError } = useAppSelector(selectProducts);

  return {
    products,
    loading,
    productsError
  };
};

export default useProducts;
