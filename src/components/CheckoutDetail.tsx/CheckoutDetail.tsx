import React from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/app/hooks';
import {
  addCartItem,
  clearCart,
  removeCartItem,
  selectCartItems,
  selectCartTotal,
  substractCartItem
} from '../../redux/cart/cartSlice';
import { formatNumT1 } from '../../utils/formatNumber';
import Button from '../Forms/Button/Button';
import './CheckoutDetail.scss';

const CheckoutDetail = () => {
  const cartItems = useAppSelector(selectCartItems);
  const CartTotal = useAppSelector(selectCartTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="checkout">
      <div className="cartModalDetail1">
        <h2>Checkout page</h2>
        {cartItems.length > 0 ? (
          <>
            <div className="cartItems">
              {cartItems.map((product: any) => (
                <div key={product.uid} className="cartItem">
                  <div className="itemImg">
                    <img src={product.imageUrl} alt={product.name} />
                  </div>
                  <div className="product">
                    <Link to={`/product/${product.uid}`}>{product.name}</Link>
                  </div>
                  <div className="crudIcon" onClick={() => dispatch(addCartItem(product))}>
                    <AiOutlinePlusCircle />
                  </div>
                  <div className="quantity">{`${product.quantity}`}</div>
                  <div className="crudIcon" onClick={() => dispatch(substractCartItem(product))}>
                    <AiOutlineMinusCircle />
                  </div>
                  <div className="price">${formatNumT1(product.price)}</div>
                  <div className="amount">${formatNumT1(product.price * product.quantity)}</div>
                  <div className="crudIcon" onClick={() => dispatch(removeCartItem(product.uid))}>
                    <TiDeleteOutline size={22} />
                  </div>
                </div>
              ))}
            </div>
            <div className="checkout">
              <div className="checkoutBtn" onClick={() => navigate('/search')}>
                <Button>Back</Button>
              </div>
              <div
                className="emtptyBtn"
                onClick={() => {
                  dispatch(clearCart());
                }}>
                <Button>Empty cart</Button>
              </div>
              <div className="checkoutBtn" onClick={() => navigate('/payments')}>
                <Button>Order</Button>
              </div>
              <div>Total ${formatNumT1(CartTotal)}</div>
            </div>
          </>
        ) : (
          <>
            <div className="cartItems">
              <div className="cartItem">No Items in cart</div>
            </div>
            <div className="checkout">
              <div className="checkoutBtn" onClick={() => navigate('/search')}>
                <Button>Back</Button>
              </div>
              <div>Total ${formatNumT1(CartTotal)}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutDetail;
