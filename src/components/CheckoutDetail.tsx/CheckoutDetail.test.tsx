import React from 'react';
import { render, screen } from '../../test-utils';

import CheckoutDetail from './CheckoutDetail';

describe('CheckoutDetail', () => {
  beforeEach(() => render(<CheckoutDetail />));

  test('renders a header', () => {
    const header = screen.getByText(/Checkout page/);
    expect(header).toBeInTheDocument();
  });

  test('renders correctly when cart is empty', () => {
    const emptyCart = screen.getByText(/No Items in cart/);
    expect(emptyCart).toBeInTheDocument();

    const backBtn = screen.getByRole('button', { name: /Back/ });
    expect(backBtn).toBeInTheDocument();

    const totalAmount = screen.getByText(/Total \$/);
    expect(totalAmount).toBeInTheDocument();
  });

  // test('renders cart items and updates correctly', () => {
  //   const cartItems = screen.getAllByRole('listitem');

  //   const addBtn = screen.getAllByRole('button', { name: /plus/i })[0];
  //   fireEvent.click(addBtn);
  //   const quantity = screen.getByText(/1/);
  //   expect(quantity).toBeInTheDocument();

  //   const substractBtn = screen.getAllByRole('button', { name: /minus/i })[0];
  //   fireEvent.click(substractBtn);
  //   expect(quantity).toHaveTextContent('0');

  //   const deleteBtn = screen.getAllByRole('button', { name: /delete/i })[0];
  //   fireEvent.click(deleteBtn);
  //   expect(cartItems.length).toBe(0);

  //   const emptyCartBtn = screen.getByRole('button', { name: /Empty cart/ });
  //   fireEvent.click(emptyCartBtn);
  //   expect(cartItems.length).toBe(0);

  //   const totalAmount = screen.getByText(/Total \$/);
  //   expect(totalAmount).toBeInTheDocument();

  //   const orderBtn = screen.getByRole('button', { name: /Order/ });
  //   fireEvent.click(orderBtn);
  //   expect(screen.getByText(/Payments/)).toBeInTheDocument();
  // });
});
