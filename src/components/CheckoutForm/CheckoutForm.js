import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51MZiaHD1QP4Uo7yanY0839HX7Iny0Gqi0LquczmJOqO2tadm4tJiFDqpoo2njZgpV9XtJpderDR250Ha3gZ3jjFx00rTVW0ljs'
);

const CheckoutForm = () => {
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const stripe = await stripePromise;
    stripePromise.paymentIntent
      .create({
        amount: 2000, // The amount you want to charge in cents
        currency: 'usd',
        payment_method_types: ['card'],
        receipt_email: 'jenny.rosen@example.com'
      })
      .then((res) => res.json())
      .then((res) => console.log(res));

    const { error, paymentIntent } = await stripe.handleCardPayment(
      'sk_test_51MZiaHD1QP4Uo7yabEVLuglz6q7aWK5k1GuejywZJUlKvqtvh4Puuf64maO4q6DBcoYw4MJBtDg5uBsAxfx2niDB00Vh7CE7B8',
      {
        payment_method: {
          card: event.target,
          billing_details: {
            name: 'Jenny Rosen'
          }
        }
      }
    );

    if (error) {
      setPaymentError(error.message);
      setPaymentSuccess(null);
    } else {
      setPaymentSuccess(paymentIntent.id);
      setPaymentError(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{paymentSuccess ? 'Payment Successful' : 'Enter your card details and pay'}</h1>

      {paymentError && <p style={{ color: 'red' }}>{paymentError}</p>}

      <input type="cardNumber" placeholder="Card number" name="cardNumber" required />
      <input type="cardExpiry" placeholder="MM/YY" name="cardExpiry" required />
      <input type="cardCvc" placeholder="CVC" name="cardCvc" required />

      <button type="submit">Pay</button>
    </form>
  );
};

export default CheckoutForm;
