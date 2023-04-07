import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore, { MockStore } from 'redux-mock-store';
import { addCartItem } from '../../../redux/cart/cartSlice';
import OneProduct from './OneProduct';
import { Product } from '../../../config/interfaces/intefaces';
import { Timestamp } from 'firebase/firestore';

describe('OneProduct component', () => {
  const mockProduct: Product = {
    uid: '1',
    name: 'Test Product',
    imageUrl: 'https://example.com/test.jpg',
    price: 9.99,
    category: { uid: '1', name: 'Test Category' },
    createDate: Timestamp.now(),
    description: 'Test description'
  };

  let store: MockStore;

  beforeEach(() => {
    store = configureStore([])({});
    render(
      <Provider store={store}>
        <MemoryRouter>
          <OneProduct product={mockProduct} />
        </MemoryRouter>
      </Provider>
    );
  });

  test('renders product details', () => {
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.name)).toHaveAttribute('src', mockProduct.imageUrl);
  });

  test('dispatches addCartItem action on "Add to cart" button click', () => {
    fireEvent.click(screen.getByText('Add to cart'));

    const expectedAction = addCartItem(mockProduct);
    expect(store.getActions()).toContainEqual(expectedAction);
  });
});
