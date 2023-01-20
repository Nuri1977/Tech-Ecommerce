import React, { useEffect, useState } from 'react';
import ProductsInfo from '../../components/AdminProducts/ProductsInfo/ProducstInfo';
import ProductsModal from '../../components/AdminProducts/ProductsModal/ProductsModal';
import Button from '../../components/Forms/Button/Button';
import useProducts from '../../hooks/useProducts';
import { useAppDispatch } from '../../redux/app/hooks';
import { fetchProductsApi } from '../../redux/products/prouctsThunk';
import './Admin.scss';

const Admin = () => {
  const [hideModal, setHideModal] = useState(true);

  const { products, loading, productsError } = useProducts();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsApi());
  }, []);

  const toggleModal = () => setHideModal(!hideModal);

  return (
    <div className="admin">
      <div className="callToActions">
        <Button onClick={() => toggleModal()}>Add new product</Button>
      </div>

      <ProductsModal toggleModal={toggleModal} hideModal={hideModal} />
      {loading ? (
        <div>Loading ....</div>
      ) : (
        <ProductsInfo products={products} loading={loading} productsError={productsError} />
      )}
    </div>
  );
};

export default Admin;
