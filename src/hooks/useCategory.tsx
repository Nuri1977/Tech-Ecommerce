import { useAppSelector } from '../redux/app/hooks';
import { selectCategories } from '../redux/categories/categoriesSlice';

const useCategories = () => {
  const { categories, loading, categoriesError } = useAppSelector(selectCategories);

  return {
    categories,
    loading,
    categoriesError
  };
};

export default useCategories;
