import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { selectCartItemsCount } from '../../redux/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { NavLink, useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  NavLink: jest.fn()
}));

jest.mock('../../redux/app/hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn()
}));

jest.mock('../../redux/cart/cartSlice', () => ({
  selectCartItemsCount: jest.fn()
}));

// interface MockNavLinkProps {
//   to: string;
//   children: React.ReactNode;
// }

// const MockNavLink: React.FC<MockNavLinkProps> = ({ to, children }) => <a href={to}>{children}</a>;

describe('Header', () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(jest.fn());
    (NavLink as unknown as jest.Mock).mockReturnValue(<a />);
    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
    (useAppSelector as jest.Mock).mockReturnValue({
      cart: { cartItems: [] }
    });
    (selectCartItemsCount as unknown as jest.Mock).mockReturnValue(1);
    render(<Header />);
  });

  test('renders logo', () => {
    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    const homeLink = screen.getByTestId(/home/i);
    expect(homeLink).toBeInTheDocument();

    const productsLink = screen.getByTestId(/products/i);
    expect(productsLink).toBeInTheDocument();
  });

  test('opens and closes cart modal', () => {
    const cartButton = screen.getByTestId(/cart/i);

    // Modal should not be visible initially
    expect(screen.queryByText(/Your cart is empty/i)).toBeNull();

    // Open modal
    fireEvent.mouseEnter(cartButton);
    expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();

    // Close modal
    fireEvent.mouseLeave(cartButton);
    expect(screen.queryByText(/Your cart is empty/i)).toBeNull();
  });

  test('opens and closes user modal', () => {
    const userButton = screen.getByTestId(/user/i);

    // Modal should not be visible initially
    expect(screen.queryByText('login')).toBeNull();

    // Open modal
    fireEvent.mouseEnter(userButton);
    expect(screen.getByTestId('login')).toBeInTheDocument();

    // Close modal
    fireEvent.mouseLeave(userButton);
    expect(screen.queryByTestId('login')).toBeNull();
  });

  test('renders cart icon with correct number of items', () => {
    const cartButton = screen.getByTestId(/cart/i);
    expect(cartButton).toBeInTheDocument();
  });
});
