import React from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import Button from '../Forms/Button/Button';
import './ProductCard.scss';

const ProductCard = () => {
  const { productId } = useParams();
  const { products } = useProducts();

  const myProduct = products.find((product) => product.uid === productId);

  if (!myProduct) return <div>Noe product was found</div>;

  return (
    <div className="productCard">
      <div className="hero">
        <img src={myProduct.imageUrl} alt={myProduct.name} />
      </div>
      <div className="productDetails">
        <ul>
          <li>
            <h1>{myProduct.name}</h1>
          </li>
          <li>
            <h3>${myProduct.price}</h3>
          </li>
          <li>
            <div className="addToCard">
              <Button type="button">Add to cart</Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductCard;
