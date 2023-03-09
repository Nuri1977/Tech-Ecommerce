import React, { useState } from 'react';
import './Header.scss';
import { useAppSelector } from '../../redux/app/hooks';
import { BsCart3 } from 'react-icons/bs';
import { BiUserCircle } from 'react-icons/bi';
import { selectCartItemsCount } from '../../redux/cart/cartSlice';
import CartModal from './CartModal/CartModal';
import { ReactComponent as CollectionSvg } from '../../assets/images/tm_new_logo_new.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import UserModal from './UserModal/UserModal';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const cartartItemsCount = useAppSelector(selectCartItemsCount);
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo" onClick={() => navigate('/')}>
          <div className="logoLink" onClick={() => navigate('/')}>
            <CollectionSvg
              style={{
                width: '100%',
                height: '36px',
                color: 'inherit'
              }}
            />
          </div>
        </div>
        <nav className="navigation">
          <ul className="navList">
            <li className="navItem">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'active navLink' : 'inactive navLink')}>
                Home
              </NavLink>
            </li>
            <li className="navItem">
              <NavLink
                to="/search"
                className={({ isActive }) => (isActive ? 'active navLink' : 'inactive navLink')}>
                Products
              </NavLink>
            </li>
            <li className="navItem">
              <div
                className="user"
                onMouseEnter={() => setUserModal(true)}
                onMouseLeave={() => setUserModal(false)}>
                <BiUserCircle size="32px" className="userIcon" />

                {userModal && (
                  <div className="userModal">
                    <UserModal />
                  </div>
                )}
              </div>
            </li>
            {/* {!currentUser && (
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
            )} */}
            <li className="navItem">
              <div
                className="cart"
                onMouseEnter={() => setShowModal(true)}
                onMouseLeave={() => setShowModal(false)}>
                <BsCart3 size="28px" className="cartIcon" />
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
