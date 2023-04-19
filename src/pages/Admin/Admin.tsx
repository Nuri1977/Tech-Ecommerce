import React, { useEffect, useState } from 'react';
import ProductsInfo from '../../components/AdminProducts/ProductsInfo/ProductsInfo';
import ProductsModal from '../../components/AdminProducts/ProductsModal/ProductsModal';
import Button from '../../common/Forms/Button/Button';
import useCategories from '../../hooks/useCategory';
import { useAppDispatch } from '../../redux/app/hooks';
import { fetchCategoriesApi } from '../../redux/categories/categoriesThunk';
import './Admin.scss';

const Admin = () => {
  const [hideModal, setHideModal] = useState(true);
  const { categories } = useCategories();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesApi());
    document.title = 'Admin';
  }, []);

  const toggleModal = () => setHideModal(!hideModal);

  return (
    <div className="admin">
      <div className="callToActions">
        <Button onClick={() => toggleModal()}>Add new product</Button>
      </div>

      <ProductsModal toggleModal={toggleModal} hideModal={hideModal} categories={categories} />
      <ProductsInfo categories={categories} />
    </div>
  );
};

export default Admin;
