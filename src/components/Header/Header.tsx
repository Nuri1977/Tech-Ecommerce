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
              data-testid="logo"
            />
          </div>
        </div>
        <nav className="navigation">
          <ul className="navList">
            <li className="navItem" data-testid="home">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'active navLink' : 'inactive navLink')}>
                Home
              </NavLink>
            </li>
            <li className="navItem" data-testid="products">
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
                onMouseLeave={() => setUserModal(false)}
                data-testid="user">
                <BiUserCircle size="32px" className="userIcon" />

                {userModal && (
                  <div className="userModal">
                    <UserModal />
                  </div>
                )}
              </div>
            </li>
            <li className="navItem">
              <div
                className="cart"
                onMouseEnter={() => setShowModal(true)}
                onMouseLeave={() => setShowModal(false)}>
                <BsCart3 size="28px" className="cartIcon" data-testid="cart" />
                {cartartItemsCount > 0 && (
                  <div className="cartQuantity">
                    <div className="items">{cartartItemsCount}</div>
                  </div>
                )}
                {showModal && (
                  <div className={cartartItemsCount === 0 ? 'emptyCartModal' : 'cartModal'}>
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
