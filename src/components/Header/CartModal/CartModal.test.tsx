import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import CartModal from './CartModal';
import thunk from 'redux-thunk';
import { removeCartItem } from '../../../redux/cart/cartSlice';

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

describe('CartModal', () => {
  let store: any;
  // eslint-disable-next-line no-unused-vars
  let component;

  beforeEach(() => {
    store = mockStore({
      cart: {
        cartItems: [
          {
            uid: '1',
            name: 'Product 1',
            imageUrl: 'https://example.com/product1.jpg',
            price: 10.99,
            quantity: 2
          },
          {
            uid: '2',
            name: 'Product 2',
            imageUrl: 'https://example.com/product2.jpg',
            price: 15.99,
            quantity: 1
          }
        ],
        total: 37.97
      }
    });

    component = render(
      <Provider store={store}>
        <BrowserRouter>
          <CartModal />
        </BrowserRouter>
      </Provider>
    );
  });

  it('renders the cart items', () => {
    const productNames = screen.getAllByText(/Product/);
    expect(productNames.length).toBe(2);
  });

  it('renders the correct item quantity and price', () => {
    const quantity1 = screen.getByText(/x 2/);
    const quantity2 = screen.getByText(/x 1/);
    const price1 = screen.getByText(/\$10.99/);
    const price2 = screen.getByText(/\$15.99/);

    expect(quantity1).toBeInTheDocument();
    expect(quantity2).toBeInTheDocument();
    expect(price1).toBeInTheDocument();
    expect(price2).toBeInTheDocument();
  });

  it('dispatches removeCartItem action when delete icon is clicked', () => {
    const deleteIcon = screen.getAllByTestId('delete-icon')[0];
    fireEvent.click(deleteIcon);

    const actions = store.getActions();
    expect(actions[0]).toEqual(removeCartItem('1'));
  });

  it('renders the checkout button and total', () => {
    const checkoutButton = screen.getByText(/Checkout/);
    const total = screen.getByText(/\$37.97/);

    expect(checkoutButton).toBeInTheDocument();
    expect(total).toBeInTheDocument();
  });
});
