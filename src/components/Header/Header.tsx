import React from 'react';
import './Header.scss';
import Logo from '../../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
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
          <ul>
            <li>
              <Link to="/registration">Registration</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
