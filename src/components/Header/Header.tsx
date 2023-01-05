import React from 'react';
import './Header.scss';
import Logo from '../../assets/images/logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <img src={Logo} />
        </div>
      </div>
    </header>
  );
};

export default Header;
