import React from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import Button from '../Forms/Button/Button';
import Input from '../Forms/Input/Input';
import './PaymentDetail.scss';

const PaymentDetail = () => {
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

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentForm({ ...paymentForm, [name]: value });
  };

  console.log(paymentForm);
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
        </div>

        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default PaymentDetail;
