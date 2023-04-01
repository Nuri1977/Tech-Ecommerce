import React from 'react';
import { useAppSelector } from '../../../redux/app/hooks';
import { removeCartItem, selectCartItems, selectCartTotal } from '../../../redux/cart/cartSlice';
import Button from '../../../common/Forms/Button/Button';
import { TiDeleteOutline } from 'react-icons/ti';
import './CartModal.scss';
import { formatNumT1 } from '../../../utils/formatNumber';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const CartModal = () => {
  const cartItems = useAppSelector(selectCartItems);
  const CartTotal = useAppSelector(selectCartTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="cartModalDetail">
      {cartItems.length > 0 && (
        <>
          <div className="cartItems">
            {cartItems.map((product) => (
              <div key={product.uid} className="cartItem">
                <div className="itemImg">
                  <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className="product">
                  <Link to={`/product/${product.uid}`}>{product.name}</Link>
                </div>
                <div className="quantity">{`x ${product.quantity}`}</div>
                <div className="price">${formatNumT1(product.price)}</div>
                <div
                  className="deleteIcon"
                  onClick={() => dispatch(removeCartItem(product.uid))}
                  data-testid="delete-icon">
                  <TiDeleteOutline size={24} />
                </div>
              </div>
            ))}
          </div>
          <div className="checkout">
            <div className="checkoutBtn" onClick={() => navigate('/checkout')}>
              <Button>Checkout</Button>
            </div>
            <div>Total ${formatNumT1(CartTotal)}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
