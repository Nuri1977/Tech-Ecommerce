import { nanoid } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { Product } from '../../../config/interfaces/intefaces';
import { useAppDispatch } from '../../../redux/app/hooks';
import { addProductApi, updateProductApi } from '../../../redux/products/prouctsThunk';
import Button from '../../Forms/Button/Button';
import FormSelect from '../../Forms/FormSelect/FormSelect';
import Input from '../../Forms/Input/Input';
import Modal from '../../Modal/Modal';

const ProductsModal = ({
  hideModal,
  toggleModal,
  selectedProduct
}: {
  hideModal: boolean;
  toggleModal: () => void;
  selectedProduct?: Product;
}) => {
  const dispatch = useAppDispatch();

  const [productCategory, setProductCategory] = useState(selectedProduct?.categoryId || 'mens');
  const [productName, setProductName] = useState(selectedProduct?.name || '');
  const [productThumbnail, setProductThumbnail] = useState(selectedProduct?.imageUrl || '');
  const [productPrice, setProductPrice] = useState(selectedProduct?.price || 0);

  useEffect(() => {
    setProductCategory(selectedProduct?.categoryId || 'mens');
    setProductName(selectedProduct?.name || '');
    setProductThumbnail(selectedProduct?.imageUrl || '');
    setProductPrice(selectedProduct?.price || 0);
  }, [selectedProduct]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedProduct?.uid) {
      dispatch(
        updateProductApi({
          uid: selectedProduct?.uid || '',
          name: productName,
          imageUrl: productThumbnail,
          price: productPrice,
          categoryId: productCategory
        })
      );
    } else {
      dispatch(
        addProductApi({
          uid: nanoid(),
          name: productName,
          imageUrl: productThumbnail,
          price: productPrice,
          categoryId: productCategory
        })
      );
    }
    toggleModal();
  };

  return (
    <>
      <Modal hideModal={hideModal} toggleModal={toggleModal}>
        <div className="addNewProductForm">
          <form onSubmit={(e) => handleSubmit(e)}>
            {selectedProduct?.uid ? <h2>Edit poduct</h2> : <h2>Add new product</h2>}
            <FormSelect
              name="category"
              label="Category"
              defaultValue={selectedProduct?.categoryId || 'mens'}
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

            <Button type="submit">{selectedProduct?.uid ? 'Edit Product' : 'Add product'}</Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ProductsModal;
