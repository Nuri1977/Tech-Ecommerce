import React from 'react';
import { Product } from '../../../config/interfaces/intefaces';

const ProductDetail = ({ product }: { product: Product }) => {
  const { name, imageUrl, price } = product;
  return (
    <div className="product">
      <div className="thumb">
        <img src={imageUrl} alt="name" />
      </div>
      <div className="details">
        <div className="name">{name}</div>

        <div className="price">${price}</div>
      </div>
    </div>
  );
};

export default ProductDetail;
