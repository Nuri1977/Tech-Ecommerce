import React, { useEffect } from 'react';
import CheckoutDetail from '../../components/CheckoutDetail.tsx/CheckoutDetail';

useEffect(() => {
  document.title = 'Checkout';
}, []);

const Checkout = () => {
  return (
    <div>
      <CheckoutDetail />
    </div>
  );
};

export default Checkout;
