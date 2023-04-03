import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import { Order } from '../../config/interfaces/intefaces';
import OrderDetail from './OrderDetail';
import { Timestamp } from 'firebase/firestore';

const order: any = {
  uid: '123',
  user: {
    uid: '123',
    email: 'test@example.com',
    displayName: 'test'
  },
  createDate: Timestamp.now(),
  amount: 5000,
  payment: {
    id: '123',
    currency: 'USD',
    amount: 5000,
    canceled_at: 5555,
    cancellation_reason: null,
    capture_method: 'automatic',
    client_secret: '123',
    confirmation_method: 'automatic',
    created: 5555,
    description: 'test',
    livemode: false,
    next_action: null,
    last_payment_error: null,
    payment_method: '123',
    payment_method_types: ['card'],
    receipt_email: 'woe@gmail.com',
    setup_future_usage: null,
    status: 'succeeded',
    shipping: {
      name: 'John Doe',
      address: {
        line1: '123 Main St',
        line2: 'Apt 1',
        city: 'San Francisco',
        state: 'CA',
        postal_code: '94105',
        country: 'US'
      }
    }
  },
  items: [
    {
      uid: '1',
      name: 'Product 1',
      quantity: 2,
      price: 1500,
      imageUrl: 'https://example.com/product1.jpg',
      category: { uid: '1', name: 'category1' },
      createDate: Timestamp.now(),
      description: 'description'
    },
    {
      uid: '2',
      name: 'Product 2',
      quantity: 1,
      price: 2000,
      imageUrl: 'https://example.com/product2.jpg',
      category: { uid: '2', name: 'category2' },
      createDate: Timestamp.now(),
      description: 'test'
    }
  ]
};

describe('OrderDetail', () => {
  it('renders the order details', () => {
    render(<OrderDetail order={order} />);

    const userEmail = screen.getByText('test@example.com');
    expect(userEmail).toBeInTheDocument();

    const orderDate = screen.getByTestId('order-date');
    expect(orderDate).toBeInTheDocument();
    const today = new Date().toLocaleDateString();
    expect(orderDate.textContent).toBe(today);

    const orderAmount = screen.getByTestId('order-amount');
    expect(orderAmount.textContent).toBe('USD 50.00');

    const shippingName = screen.getByText('John Doe');
    expect(shippingName).toBeInTheDocument();

    const shippingAddressLine1 = screen.getByText('123 Main St');
    expect(shippingAddressLine1).toBeInTheDocument();
  });

  it('toggles the cart items', () => {
    render(<OrderDetail order={order} />);

    const toggleButton = screen.getByTestId('toggle-icon');
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);

    const product1 = screen.getByText('Product 1');
    expect(product1).toBeInTheDocument();

    const product2 = screen.getByText('Product 2');
    expect(product2).toBeInTheDocument();
  });
});
