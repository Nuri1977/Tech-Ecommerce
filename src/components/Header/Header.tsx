import React, { useState } from 'react';
import './Header.scss';
import Logo from '../../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { signOutFun } from '../../redux/authentication/authThunk';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import useAuth from '../../hooks/useAuth';
import { BsCart3 } from 'react-icons/bs';
import { selectCartItemsCount } from '../../redux/cart/cartSlice';
import CartModal from '../ProductCart/CartModal/CartModal';

const Header = () => {
  const { currentUser, isAdmin } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const cartartItemsCount = useAppSelector(selectCartItemsCount);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo" onClick={() => navigate('/')}>
          <Link to="/">
            <img src={Logo} alt="SimpleTut Logo" />
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>
        <div className="callToActions">
          <ul>
            {!currentUser && (
              <>
                <li>
                  <Link to="/registration">Registration</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
            {currentUser && isAdmin && (
              <li>
                <Link to="/admin">Admin Dashboard</Link>
              </li>
            )}
            {currentUser && !isAdmin && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}
            {currentUser && (
              <li>
                <span onClick={() => dispatch(signOutFun())}>Logout</span>
              </li>
            )}
            <li>
              <div
                className="cart"
                onMouseEnter={() => setShowModal(true)}
                onMouseLeave={() => setShowModal(false)}>
                <BsCart3 size="24px" className="cartIcon" />
                {cartartItemsCount > 0 && (
                  <div className="cartQuantity">
                    <div className="items">{cartartItemsCount}</div>
                  </div>
                )}
                {showModal && (
                  <div className="cartModal">
                    <CartModal />
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
