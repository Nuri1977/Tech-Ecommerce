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
        <a>Shop Womens</a>
      </div>
      <div
        className="item"
        style={{
          backgroundImage: `url(${ShopMen})`
        }}>
        <a>Shop Mens</a>
      </div>
    </div>
  );
};

export default Directory;
