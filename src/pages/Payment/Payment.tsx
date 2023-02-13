import React from 'react';
import PaymentDetail from '../../components/PaymentDetail/PaymentDetail';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51MZiaHD1QP4Uo7yanY0839HX7Iny0Gqi0LquczmJOqO2tadm4tJiFDqpoo2njZgpV9XtJpderDR250Ha3gZ3jjFx00rTVW0ljs'
);

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentDetail />
    </Elements>
  );
};

export default Payment;
