import React, { useState } from 'react';
import './Header.scss';
import Logo from '../../assets/images/tm_new_logo_new.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
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
          <ul className="navList">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/search"
                className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                E-shop
              </NavLink>
            </li>
            {!currentUser && (
              <>
                <li>
                  <NavLink
                    to="/registration"
                    className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                    Registration
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                    Login
                  </NavLink>
                </li>
              </>
            )}
            {currentUser && isAdmin && (
              <li>
                <NavLink
                  to="/admin"
                  className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                  Admin
                </NavLink>
              </li>
            )}
            {currentUser && !isAdmin && (
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                  Dashboard
                </NavLink>
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
        </nav>
      </div>
    </header>
  );
};

export default Header;
