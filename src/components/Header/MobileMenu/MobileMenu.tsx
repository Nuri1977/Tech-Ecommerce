import React from 'react';
import './MobileMenu.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../../redux/app/hooks';
import { selectCartItemsCount } from '../../../redux/cart/cartSlice';
import useAuth from '../../../hooks/useAuth';
import { signOutFun } from '../../../redux/authentication/authThunk';

const MobileMenu = ({
  mobileMenu,
  setMobileMenu
}: {
  mobileMenu: boolean;
  setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const cartartItemsCount = useAppSelector(selectCartItemsCount);
  const { currentUser, isAdmin } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const togleMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <>
      <div className="overlay" onClick={togleMenu} />
      <menu className={'menu ' + (mobileMenu && 'active-menu')}>
        <div style={{ height: '6.5rem', width: '100%' }} />
        <div style={{ padding: '20px', width: '100%', height: '100%' }}>
          <ul className="menu-list">
            <li className="menu-item" data-testid="home" onClick={togleMenu}>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'active navLink' : 'inactive navLink')}>
                Home
              </NavLink>
            </li>
            <li className="menu-item" data-testid="products" onClick={togleMenu}>
              <NavLink
                to="/search"
                className={({ isActive }) => (isActive ? 'active navLink' : 'inactive navLink')}>
                Products
              </NavLink>
            </li>
            {!currentUser && (
              <>
                <li className="menu-item" onClick={togleMenu}>
                  <NavLink to="/registration" className="navLink">
                    Registration
                  </NavLink>
                </li>
                <li className="menu-item" data-testid="login" onClick={togleMenu}>
                  <NavLink to="/login" className="navLink">
                    Login
                  </NavLink>
                </li>
              </>
            )}
            {currentUser && isAdmin && (
              <li className="menu-item" onClick={togleMenu}>
                <NavLink to="/admin" className="navLink">
                  Admin
                </NavLink>
              </li>
            )}
            {currentUser && !isAdmin && (
              <li className="menu-item" onClick={togleMenu}>
                <NavLink to="/dashboard" className="navLink">
                  Dashboard
                </NavLink>
              </li>
            )}
            {currentUser && (
              <li className="menu-item" onClick={togleMenu}>
                <a onClick={() => dispatch(signOutFun())} className="navLink">
                  Logout
                </a>
              </li>
            )}
            <li
              className="menu-item"
              onClick={() => {
                navigate('/checkout');
                togleMenu();
              }}>
              <div className="cart">
                <BsCart3 size="24px" className="cartIcon" data-testid="cart" />
                {cartartItemsCount > 0 && (
                  <div className="cartQuantity">
                    <div className="items">{cartartItemsCount}</div>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      </menu>
    </>
  );
};

export default MobileMenu;
