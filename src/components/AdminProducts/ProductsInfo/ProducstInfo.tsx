import React from 'react';
import { ProductState } from '../../../config/interfaces/intefaces';
import { useAppDispatch } from '../../../redux/app/hooks';
import { deleteProductApi } from '../../../redux/products/prouctsThunk';
import Button from '../../Forms/Button/Button';

const ProductsInfo = ({ products, loading, productsError }: ProductState) => {
  const dispatch = useAppDispatch();
  console.log(productsError);
  return (
    <ul className="productsInfo">
      {products &&
        products.map((product) => (
          <li key={product.uid} className="productCard">
            <img src={product.imageUrl} alt={product.name} className="productImage" />
            <h5>{product.name}</h5>
            <h5>{product.categoryId}</h5>
            <h5>{product.price}</h5>
            <div className="buttons">
              <Button>{loading ? 'Loading...' : 'Edit'}</Button>
              <Button onClick={() => dispatch(deleteProductApi(product.uid))}>
                {loading ? 'Loading...' : 'Delete'}
              </Button>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default ProductsInfo;
