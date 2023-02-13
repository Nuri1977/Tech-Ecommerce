import React from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Button from '../Forms/Button/Button';
import Input from '../Forms/Input/Input';
import './PaymentDetail.scss';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import { axiosIns } from '../../utils/axiosIns';
import { selectCartTotal } from '../../redux/cart/cartSlice';
import { useAppSelector } from '../../redux/app/hooks';

const PaymentDetail = () => {
  const elements = useElements();
  const stripe = useStripe();
  const amount = useAppSelector(selectCartTotal);
  console.log('amount:', amount);
  const [paymentForm, setPaymentForm] = React.useState({
    shipingName: '',
    shipingAdress: '',
    shipingCity: '',
    shipingState: '',
    shipingPostalCode: '',
    shipingCountry: '',
    billingName: '',
    billingAdress: '',
    billingCity: '',
    billingState: '',
    billingPostalCode: '',
    billingCountry: ''
  });

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cardElement = elements?.getElement('card');
    // Getitng the payment intent from the server
    axiosIns
      .post('payments/create', {
        amount: (amount * 100).toFixed(0),
        shipping: {
          name: paymentForm.shipingName,
          address: {
            line1: paymentForm.shipingAdress,
            city: paymentForm.shipingCity,
            state: paymentForm.shipingState,
            postal_code: paymentForm.shipingPostalCode,
            country: paymentForm.shipingCountry
          }
        }
      })
      .then((data) => {
        console.log({ data });
        stripe
          ?.createPaymentMethod({
            type: 'card',
            card: cardElement!,
            billing_details: {
              name: paymentForm.billingName,
              address: {
                line1: paymentForm.billingAdress,
                city: paymentForm.billingCity,
                state: paymentForm.billingState,
                postal_code: paymentForm.billingPostalCode,
                country: paymentForm.billingCountry
              }
            }
          })
          .then((paymentMethodResult) => {
            // Confirming the payment
            stripe
              .confirmCardPayment(data.data, {
                payment_method: paymentMethodResult.paymentMethod?.id
              })
              .then((paymentIntentResult) => console.log({ paymentIntentResult }))
              .catch((err) => console.log(err));
          })
          .catch((error) => console.log({ error }));
      })
      .catch((err) => console.log(err));
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentForm({ ...paymentForm, [name]: value });
  };

  const configCardElement: StripeCardElementOptions | undefined = {
    iconStyle: 'solid',
    style: {
      base: {
        fontSize: '16px'
      }
    },
    hidePostalCode: true
  };

  return (
    <div className="paymentDetail">
      <form onSubmit={handleOnSubmit} className="paymentForm">
        <div className="group">
          <h2>Shiping Adress</h2>
          <Input
            name="shipingName"
            type="text"
            placeholder="Recipient Name"
            value={paymentForm.shipingName}
            onChange={handleOnChange}
          />
          <Input
            name="shipingAdress"
            type="text"
            placeholder="Recipient Adress"
            value={paymentForm.shipingAdress}
            onChange={handleOnChange}
          />
          <Input
            name="shipingCity"
            type="text"
            placeholder="Recipient City"
            value={paymentForm.shipingCity}
            onChange={handleOnChange}
          />
          <Input
            name="shipingState"
            type="text"
            placeholder="Recipient State"
            value={paymentForm.shipingState}
            onChange={handleOnChange}
          />
          <Input
            name="shipingPostalCode"
            type="text"
            placeholder="Recipient Postal Code"
            value={paymentForm.shipingPostalCode}
            onChange={handleOnChange}
          />
          <CountryDropdown
            valueType="short"
            name="shipingCountry"
            value={paymentForm.shipingCountry}
            onChange={(val) => setPaymentForm({ ...paymentForm, shipingCountry: val })}
          />
        </div>
        <div className="group">
          <h2>Billing Adress</h2>
          <Input
            name="billingName"
            type="text"
            placeholder="Recipient Name"
            value={paymentForm.billingName}
            onChange={handleOnChange}
          />
          <Input
            name="billingAdress"
            type="text"
            placeholder="Recipient Adress"
            value={paymentForm.billingAdress}
            onChange={handleOnChange}
          />
          <Input
            name="billingCity"
            type="text"
            placeholder="Recipient City"
            value={paymentForm.billingCity}
            onChange={handleOnChange}
          />
          <Input
            name="billingState"
            type="text"
            placeholder="Recipient State"
            value={paymentForm.billingState}
            onChange={handleOnChange}
          />
          <Input
            name="billingPostalCode"
            type="text"
            placeholder="Recipient Postal Code"
            value={paymentForm.billingPostalCode}
            onChange={handleOnChange}
          />

          <CountryDropdown
            valueType="short"
            name="billingCountry"
            value={paymentForm.billingCountry}
            onChange={(val) => setPaymentForm({ ...paymentForm, billingCountry: val })}
          />
        </div>
        <div className="group">
          <h2>Card details</h2>
          <CardElement options={configCardElement} />
        </div>

        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default PaymentDetail;
