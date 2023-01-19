import { nanoid } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../redux/app/hooks';
import { addProductApi } from '../../../redux/products/prouctsThunk';
import Button from '../../Forms/Button/Button';
import FormSelect from '../../Forms/FormSelect/FormSelect';
import Input from '../../Forms/Input/Input';
import Modal from '../../Modal/Modal';

const ProductsModal = ({ hideModal, toggleModal }: any) => {
  const [productCategory, setProductCategory] = useState('mens');
  const [productName, setProductName] = useState('');
  const [productThumbnail, setProductThumbnail] = useState('');
  const [productPrice, setProductPrice] = useState(0);

  const dispatch = useAppDispatch();

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
    <>
      <Modal hideModal={hideModal} toggleModal={toggleModal}>
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
    </>
  );
};

export default ProductsModal;
