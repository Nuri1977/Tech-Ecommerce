import React from 'react';
import { Product } from '../../../config/interfaces/intefaces';
import Button from '../../Forms/Button/Button';

const ProductsInfo = ({ products }: { products: Product[] }) => {
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
              <Button>Edit</Button>
              <Button>Delete</Button>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default ProductsInfo;
