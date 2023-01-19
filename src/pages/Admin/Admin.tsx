import React, { useEffect, useState } from 'react';
import Button from '../../components/Forms/Button/Button';
import FormSelect from '../../components/Forms/FormSelect/FormSelect';
import Input from '../../components/Forms/Input/Input';
import Modal from '../../components/Modal/Modal';
import { nanoid } from '@reduxjs/toolkit';
import './Admin.scss';
import { useAppDispatch } from '../../redux/app/hooks';
import { addProductApi, fetchProductsApi } from '../../redux/products/prouctsThunk';
import useProducts from '../../hooks/useProducts';

const Admin = () => {
  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState('mens');
  const [productName, setProductName] = useState('');
  const [productThumbnail, setProductThumbnail] = useState('');
  const [productPrice, setProductPrice] = useState(0);

  const { products, loading, productsError } = useProducts();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsApi());
  }, []);

  const toggleModal = () => setHideModal(!hideModal);

  console.log(productsError);

  const configModal = {
    hideModal,
    toggleModal
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addProductApi({
        uid: nanoid(),
        name: productName,
        imageUrl: productThumbnail,
        price: productPrice,
        categoryId: productCategory
      })
    );
    toggleModal();
  };
  return (
    <div className="admin">
      <div className="callToActions">
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>Add new product</Button>
          </li>
        </ul>
      </div>

      <Modal {...configModal}>
        <div className="addNewProductForm">
          <form onSubmit={(e) => handleSubmit(e)}>
            <h2>Add new product</h2>

            <FormSelect
              name="category"
              label="Category"
              defaultValue="mens"
              options={[
                {
                  value: 'mens',
                  name: 'Mens'
                },
                {
                  value: 'womens',
                  name: 'Womens'
                }
              ]}
              onChange={(e) => setProductCategory(e.target.value)}
            />

            <Input
              name="name"
              label="Name"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />

            <Input
              name="imageUrl"
              label="Main image URL"
              type="url"
              value={productThumbnail}
              onChange={(e) => setProductThumbnail(e.target.value)}
            />

            <Input
              name="price"
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              value={productPrice}
              onChange={(e: any) => setProductPrice(e.target.value)}
            />

            <Button type="submit">Add product</Button>
          </form>
        </div>
      </Modal>
      {loading ? (
        <div>Loading ....</div>
      ) : (
        <div className="productsInfo">
          <ul>
            {products && products.map((product) => <li key={product.uid}>{product.name}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Admin;
