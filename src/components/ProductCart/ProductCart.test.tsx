import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import useProducts from '../../hooks/useProducts';
import ProductCart from './ProductCart';
import { useParams } from 'react-router-dom';
import { addCartItem } from '../../redux/cart/cartSlice';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../hooks/useProducts');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}));

describe('ProductCart', () => {
  const product = {
    uid: '1',
    name: 'Product 1',
    price: 9.99,
    description: 'A product description',
    imageUrl: 'https://example.com/product1.jpg'
  };

  beforeEach(() => {
    (useProducts as jest.Mock).mockReturnValue({ products: [product] });
    (useParams as jest.Mock).mockReturnValue({ productId: product.uid });
  });

  test('renders the product details correctly', () => {
    render(
      <Provider store={mockStore({})}>
        <BrowserRouter>
          <ProductCart />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('product-name')).toBeInTheDocument();
    expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
    expect(screen.getByAltText(product.name)).toHaveAttribute('src', product.imageUrl);
    expect(screen.getByText('A product description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });

  test('dispatches addCartItem action when Add to cart button is clicked', async () => {
    const store = mockStore({
      cart: []
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCart />
        </BrowserRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(store.getActions()).toEqual([addCartItem(product)]);
  });

  it('renders No product was found message when product is not found', () => {
    (useProducts as jest.Mock).mockReturnValue({ products: [] });

    render(
      <Provider store={mockStore({})}>
        <BrowserRouter>
          <ProductCart />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.queryByTestId('product-name')).not.toBeInTheDocument();
  });
});
