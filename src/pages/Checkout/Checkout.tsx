import React, { useEffect } from 'react';
import CheckoutDetail from '../../components/CheckoutDetail.tsx/CheckoutDetail';

const Checkout = () => {
  useEffect(() => {
    document.title = 'Checkout';
  }, []);

  return (
    <div>
      <CheckoutDetail />
    </div>
  );
};

export default Checkout;
