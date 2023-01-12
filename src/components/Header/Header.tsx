import React from 'react';
import './Header.scss';
import Logo from '../../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { signOutFun } from '../../redux/authentication/authThunk';
import { useAppDispatch } from '../../redux/app/hooks';
import useAuth from '../../hooks/useAuth';

const Header = () => {
  const { currentUser } = useAuth();
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
        <div className="callToActions">
          {!currentUser && (
            <ul>
              <li>
                <Link to="/registration">Registration</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
          {currentUser && (
            <ul>
              <li>
                <span onClick={() => dispatch(signOutFun())}>Logout</span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
