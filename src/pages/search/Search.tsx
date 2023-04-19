import React, { useEffect } from 'react';
import Products from '../../components/Products/Products';
import './Search.scss';

const Search = () => {
  useEffect(() => {
    document.title = 'Products';
  }, []);

  return (
    <div className="searchPage">
      <Products />
    </div>
  );
};

export default Search;
