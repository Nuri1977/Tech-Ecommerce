import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../config/interfaces/intefaces';
import Button from '../../Forms/Button/Button';

const OneProduct = ({ product }: { product: Product }) => {
  const { name, imageUrl, price } = product;
  return (
    <div className="product">
      <div className="thumb">
        <Link to={`/product/${product.uid}`}>
          <img src={imageUrl} alt="name" />
        </Link>
      </div>
      <div className="details">
        <Link to={`/product/${product.uid}`}>
          <div className="name">{name}</div>
        </Link>

        <div className="price">${price}</div>
      </div>
      <Button>Add to cart</Button>
    </div>
  );
};

export default OneProduct;
