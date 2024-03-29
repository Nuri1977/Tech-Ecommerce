import { nanoid } from '@reduxjs/toolkit';
import { CKEditor } from 'ckeditor4-react';
import { Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Category, Product } from '../../../config/interfaces/intefaces';
import { useAppDispatch } from '../../../redux/app/hooks';
import { addProductApi, updateProductApi } from '../../../redux/products/productsThunk';
import Button from '../../../common/Forms/Button/Button';
import FormSelect from '../../../common/Forms/FormSelect/FormSelect';
import Input from '../../../common/Forms/Input/Input';
import Modal from '../../Modal/Modal';

const ProductsModal = ({
  hideModal,
  toggleModal,
  selectedProduct,
  categories
}: {
  hideModal: boolean;
  toggleModal: () => void;
  selectedProduct?: Product;
  categories: Category[];
}) => {
  const dispatch = useAppDispatch();

  const [productCategory, setProductCategory] = useState<Category>(
    selectedProduct?.category || { uid: '', name: '' }
  );
  const [productName, setProductName] = useState(selectedProduct?.name || '');
  const [productThumbnail, setProductThumbnail] = useState(selectedProduct?.imageUrl || '');
  const [productPrice, setProductPrice] = useState(selectedProduct?.price || 0);
  const [description, setDescription] = useState(selectedProduct?.description || '');

  useEffect(() => {
    setProductCategory(selectedProduct?.category || { uid: '', name: '' });
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
          category: productCategory,
          createDate: Timestamp.now(),
          description
        })
      );
    } else {
      dispatch(
        addProductApi({
          uid: nanoid(),
          name: productName,
          imageUrl: productThumbnail,
          price: productPrice,
          category: productCategory,
          createDate: Timestamp.now(),
          description
        })
      );
    }
    setProductCategory({ uid: '', name: '' });
    setProductName('');
    setProductThumbnail('');
    setProductPrice(0);
    setDescription('');
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
              label="category"
              value={productCategory.uid}
              options={categories}
              onChange={(e) => {
                const myName =
                  categories.find((cat) => cat.uid === e.target.value)?.name || 'No name';
                setProductCategory({
                  uid: e.target.value,
                  name: myName
                });
              }}
            />

            <Input
              name="name"
              label="Name"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              data-testid="name"
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

            <CKEditor onChange={(e) => setDescription(e.editor.getData())} data-testid="ckeditor" />

            <Button type="submit">{selectedProduct?.uid ? 'Edit Product' : 'Add product'}</Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ProductsModal;
