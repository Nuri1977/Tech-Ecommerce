import React from 'react';
import ShopMen from '../../assets/images/shopMens.jpg';
import ShopWomen from '../../assets/images/shopWomens.jpg';
import './Directory.scss';

const Directory = () => {
  return (
    <div className="directory">
      <div
        className="item"
        style={{
          backgroundImage: `url(${ShopWomen})`
        }}>
        <a>Shop Women</a>
      </div>
      <div
        className="item"
        style={{
          backgroundImage: `url(${ShopMen})`
        }}>
        <a>Shop Men</a>
      </div>
    </div>
  );
};

export default Directory;
