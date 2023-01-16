import React, { useEffect, useState } from 'react';
import Button from '../../components/Forms/Button/Button';
import FormSelect from '../../components/Forms/FormSelect/FormSelect';
import Input from '../../components/Forms/Input/Input';
import Modal from '../../components/Modal/Modal';

import './Admin.scss';

const initialProducts: any = [
  {
    productId: 1,
    name: 'Product 1',
    price: 123,
    imageUrl: 'image1',
    categoryId: 2
  },
  {
    productId: 2,
    name: 'Product 3',
    price: 456,
    imageUrl: 'image3',
    categoryId: 4
  }
];

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [hideModal, setHideModal] = useState(true);
  const [productCategory, setProductCategory] = useState('mens');
  const [productName, setProductName] = useState('');
  const [productThumbnail, setProductThumbnail] = useState('');
  const [productPrice, setProductPrice] = useState(0);

  useEffect(() => {
    setProducts(initialProducts);
  }, []);

  console.log(products, productCategory);
  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
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
          <form onSubmit={handleSubmit}>
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
              onChange={(e: any) => setProductCategory(e.target.value)}
            />

            <Input
              name="name"
              label="Name"
              type="text"
              value={productName}
              onChange={(e: any) => setProductName(e.target.value)}
            />

            <Input
              name="imageUrl"
              label="Main image URL"
              type="url"
              value={productThumbnail}
              onChange={(e: any) => setProductThumbnail(e.target.value)}
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
    </div>
  );
};

export default Admin;
