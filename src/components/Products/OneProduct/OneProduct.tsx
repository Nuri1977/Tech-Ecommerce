import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../../../config/interfaces/intefaces';
import { addCartItem } from '../../../redux/cart/cartSlice';
import Button from '../../../common/Forms/Button/Button';
import Card from '../../../common/Card/Card';

const OneProduct = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, imageUrl, price } = product;

  return (
    <Card className="product">
      <div className="thumb" onClick={() => navigate(`/product/${product.uid}`)}>
        <img src={imageUrl} alt={product.name} />
      </div>
      <div className="details">
        <Link to={`/product/${product.uid}`}>
          <div className="name">{name}</div>
        </Link>

        <div className="price">${price}</div>
      </div>
      <Button onClick={() => dispatch(addCartItem(product))}>Add to cart</Button>
    </Card>
  );
};

export default OneProduct;
