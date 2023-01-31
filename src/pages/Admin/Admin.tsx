import React, { useEffect, useState } from 'react';
import ProductsInfo from '../../components/AdminProducts/ProductsInfo/ProducstInfo';
import ProductsModal from '../../components/AdminProducts/ProductsModal/ProductsModal';
import Button from '../../components/Forms/Button/Button';
import useCategories from '../../hooks/useCategory';
import useProducts from '../../hooks/useProducts';
import { useAppDispatch } from '../../redux/app/hooks';
import { fetchCategoriesApi } from '../../redux/categories/categoriesThunk';
import { fetchProductsApi } from '../../redux/products/productsThunk';
import './Admin.scss';

const Admin = () => {
  const [hideModal, setHideModal] = useState(true);

  const { products, loading } = useProducts();
  const { categories } = useCategories();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsApi());
    dispatch(fetchCategoriesApi());
  }, []);

  const toggleModal = () => setHideModal(!hideModal);

  return (
    <div className="admin">
      <div className="callToActions">
        <Button onClick={() => toggleModal()}>Add new product</Button>
      </div>

      <ProductsModal toggleModal={toggleModal} hideModal={hideModal} categories={categories} />
      {loading ? (
        <div>Loading ....</div>
      ) : (
        <ProductsInfo products={products} loading={loading} categories={categories} />
      )}
    </div>
  );
};

export default Admin;
