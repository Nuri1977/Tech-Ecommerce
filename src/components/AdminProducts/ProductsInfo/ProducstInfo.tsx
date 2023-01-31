import { Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { Category, Product } from '../../../config/interfaces/intefaces';
import { useAppDispatch } from '../../../redux/app/hooks';
import { deleteProductApi } from '../../../redux/products/prouctsThunk';
import Button from '../../Forms/Button/Button';
import ProductsModal from '../ProductsModal/ProductsModal';

const ProductsInfo = ({
  products,
  loading,
  categories
}: {
  products: Product[];
  loading: boolean;
  categories: Category[];
}) => {
  const dispatch = useAppDispatch();
  const [hideModal, setHideModal] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product>({
    name: '',
    uid: '',
    imageUrl: '',
    category: { uid: '', name: '' },
    price: 0,
    createDate: Timestamp.now()
  });

  const toggleModal = (product?: Product) => {
    if (product) setSelectedProduct(product);
    setHideModal(!hideModal);
  };
  return (
    <>
      <ul className="productsInfo">
        {products &&
          products.map((product) => (
            <li key={product.uid} className="productCard">
              <img src={product.imageUrl} alt={product.name} className="productImage" />
              <h5>{product.name}</h5>
              <h5>{product.category?.name}</h5>
              <h5>{product.price}</h5>
              <div className="buttons">
                <Button onClick={() => toggleModal(product)}>
                  {loading ? 'Loading...' : 'Edit'}
                </Button>
                <Button onClick={() => dispatch(deleteProductApi(product.uid))}>
                  {loading ? 'Loading...' : 'Delete'}
                </Button>
              </div>
            </li>
          ))}
      </ul>
      <ProductsModal
        toggleModal={toggleModal}
        hideModal={hideModal}
        selectedProduct={selectedProduct}
        categories={categories}
      />
    </>
  );
};

export default ProductsInfo;
