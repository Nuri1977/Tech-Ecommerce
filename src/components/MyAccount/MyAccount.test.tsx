import React from 'react';
import { render, screen } from '@testing-library/react';
import MyAccount from './MyAccount';

describe('MyAccount', () => {
  it('renders MyAccount component', () => {
    render(<MyAccount />);
    const myAccountElement = screen.getByText(/MyAccount/i);
    expect(myAccountElement).toBeInTheDocument();
  });
});
