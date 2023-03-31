import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductsModal from './ProductsModal';
import { addProductApi } from '../../../redux/products/productsThunk';

const mockProducts = [
  {
    uid: '1',
    name: 'Product 1',
    imageUrl: 'https://example.com/image1.jpg',
    category: { uid: '1', name: 'Category 1' },
    price: 10,
    createDate: { toDate: () => new Date() },
    description: 'Description 1'
  },
  {
    uid: '2',
    name: 'Product 2',
    imageUrl: 'https://example.com/image2.jpg',
    category: { uid: '2', name: 'Category 2' },
    price: 20,
    createDate: { toDate: () => new Date() },
    description: 'Description 2'
  }
];

const mockCategories = [
  { uid: '1', name: 'Category 1' },
  { uid: '2', name: 'Category 2' }
];

jest.mock('../../../hooks/useProducts', () => () => ({
  products: mockProducts,
  loading: false,
  paginateNext: null
}));

jest.mock('../../../redux/app/hooks', () => ({
  useAppDispatch: () => jest.fn()
}));

jest.mock('../../../redux/products/productsThunk', () => ({
  addProductApi: jest.fn()
}));

describe('ProductsModal', () => {
  test('renders modal with form elements', () => {
    const toggleModal = jest.fn();
    render(
      <ProductsModal hideModal={false} toggleModal={toggleModal} categories={mockCategories} />
    );

    expect(screen.getByText(/add new product/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/main image url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add product/i })).toBeInTheDocument();
  });

  test('submits form with new product data', async () => {
    const toggleModal = jest.fn();
    render(
      <ProductsModal hideModal={false} toggleModal={toggleModal} categories={mockCategories} />
    );

    const categorySelect = screen.getByRole('combobox');
    await userEvent.selectOptions(categorySelect, '1');
    expect(categorySelect).toHaveValue('1');

    const nameInput = screen.getByLabelText(/name/i);
    await userEvent.type(nameInput, 'Product name');
    expect(nameInput).toHaveValue('Product name');

    const imageUrlInput = screen.getByLabelText(/main image url/i);
    await userEvent.type(imageUrlInput, 'https://example.com/image.png');
    expect(imageUrlInput).toHaveValue('https://example.com/image.png');

    const priceInput = screen.getByLabelText(/price/i);
    await userEvent.clear(priceInput);
    await userEvent.type(priceInput, '10');
    expect(priceInput).toHaveValue(10);

    const submitButton = screen.getByRole('button', { name: /add product/i });
    await userEvent.click(submitButton);

    expect(addProductApi).toHaveBeenCalledTimes(1);
    expect(addProductApi).toHaveBeenCalledWith({
      uid: expect.any(String),
      name: 'Product name',
      imageUrl: 'https://example.com/image.png',
      price: '10',
      category: {
        uid: '1',
        name: 'Category 1'
      },
      createDate: expect.objectContaining({
        seconds: expect.any(Number),
        nanoseconds: expect.any(Number)
      }),
      description: ''
    });

    expect(toggleModal).toHaveBeenCalledTimes(1);
  });
});
