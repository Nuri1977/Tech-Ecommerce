import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import { addCartItem } from '../../redux/cart/cartSlice';
import Button from '../../common/Forms/Button/Button';
import './ProductCart.scss';

const ProductCart = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { products } = useProducts();

  const myProduct = products.find((product) => product.uid === productId);

  if (!myProduct) return <div>Noe product was found</div>;

  return (
    <div className="productCart">
      <div className="hero">
        <img src={myProduct.imageUrl} alt={myProduct.name} className="heroImage" />
      </div>
      <div className="productDetails">
        <ul>
          <li>
            <h1 data-testid="product-name">{myProduct.name}</h1>
          </li>
          <li>
            <h3>${myProduct.price}</h3>
          </li>
          <li>
            <div className="addToCart">
              <Button type="button" onClick={() => dispatch(addCartItem(myProduct))}>
                Add to cart
              </Button>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <div className="description" dangerouslySetInnerHTML={{ __html: myProduct.description }} />
      </div>
    </div>
  );
};

export default ProductCart;
