import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Products from './Products';
import { BrowserRouter } from 'react-router-dom';
import { Product } from '../../config/interfaces/intefaces';
import { Timestamp } from 'firebase/firestore';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const mockProducts: Product[] = [
  {
    uid: '1',
    name: 'Product 1',
    imageUrl: 'https://example.com/test.jpg',
    price: 9.99,
    category: { uid: '1', name: 'Category 1' },
    createDate: Timestamp.now(),
    description: 'Test description'
  },
  {
    uid: '2',
    name: 'Product 2',
    imageUrl: 'https://example.com/test.jpg',
    price: 19.99,
    category: { uid: '2', name: 'Category 2' },
    createDate: Timestamp.now(),
    description: 'Test description'
  },
  {
    uid: '3',
    name: 'Product 3',
    imageUrl: 'https://example.com/test.jpg',
    price: 29.99,
    category: { uid: '1', name: 'Category 1' },
    createDate: Timestamp.now(),
    description: 'Test description'
  }
];

const mockCategories = [
  { uid: '1', name: 'Category 1' },
  { uid: '2', name: 'Category 2' }
];

const mockPaginateNext = { id: '4', name: 'Product 4', price: 39.99 };

describe('Products component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      products: {
        products: mockProducts,
        loading: false,
        productsError: null,
        paginateNext: mockPaginateNext
      },
      categories: {
        categories: mockCategories,
        loading: false,
        categoriesError: null
      }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Products />
        </BrowserRouter>
      </Provider>
    );
  });

  test('should render products and pagination when not loading and products available', () => {
    // Check that products are rendered
    expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Product 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Product 3/i)).toBeInTheDocument();

    // Check that pagination is rendered
    expect(screen.getByText(/Back/i)).toBeInTheDocument();
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
    expect(screen.getByText(1)).toBeInTheDocument();
  });

  it('should render loading indicator when loading', () => {
    store = mockStore({
      products: {
        products: [],
        loading: true,
        productsError: null,
        paginateNext: null
      },
      categories: {
        categories: mockCategories,
        loading: false,
        categoriesError: null
      }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Products />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('should render no products message when no products available', () => {
    store = mockStore({
      products: {
        products: [],
        loading: false,
        productsError: null,
        paginateNext: null
      },
      categories: {
        categories: mockCategories,
        loading: false,
        categoriesError: null
      }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Products />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/No products/i)).toBeInTheDocument();
  });

  test('should dispatch fetchProductsApi action on filterValue and pageSize change', () => {
    userEvent.selectOptions(screen.getByTestId(/All categories/i), 'Category 2');
    userEvent.selectOptions(screen.getByTestId(/items per page/i), '20');

    expect(store.getActions()).toContainEqual(
      expect.objectContaining({ type: 'products/fetchProductsApi/pending' })
    );
    expect(store.getActions()).toContainEqual(
      expect.objectContaining({ type: 'categories/fetchCategoriesApi/pending' })
    );
  });
});
