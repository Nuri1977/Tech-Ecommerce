import React, { useEffect } from 'react';
import ProductCart from '../../components/ProductCart/ProductCart';

const ProductDetail = () => {
  useEffect(() => {
    document.title = 'Product Detail';
  }, []);

  return (
    <div>
      <ProductCart />
    </div>
  );
};

export default ProductDetail;
