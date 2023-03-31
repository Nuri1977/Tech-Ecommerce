import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import DailyHighlights from './DailyHighlights';
import useProducts from '../../../hooks/useProducts';
import { useAppDispatch } from '../../../redux/app/hooks';
import { fetchProductsApi } from '../../../redux/products/productsThunk';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

jest.mock('../../../hooks/useProducts', () => jest.fn());

jest.mock('../../../redux/app/hooks', () => ({
  useAppDispatch: jest.fn()
}));

jest.mock('../../../redux/products/productsThunk', () => ({
  fetchProductsApi: jest.fn()
}));

describe('DailyHighlights', () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(jest.fn());
    (useProducts as jest.Mock).mockReturnValue({ products: [] });
    (useAppDispatch as jest.Mock).mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the daily highlights section with the correct title', () => {
    render(<DailyHighlights />);
    const title = screen.getByText(/daily highlights/i);
    expect(title).toBeInTheDocument();
  });

  it('should render the filtered products', () => {
    const mockProducts = [
      { uid: 1, imageUrl: 'image1.jpg', name: 'Product 1', price: 10 },
      { uid: 2, imageUrl: 'image2.jpg', name: 'Product 2', price: 20 },
      { uid: 3, imageUrl: 'image3.jpg', name: 'Product 3', price: 30 },
      { uid: 4, imageUrl: 'image4.jpg', name: 'Product 4', price: 40 },
      { uid: 5, imageUrl: 'image5.jpg', name: 'Product 5', price: 50 }
    ];
    (useProducts as jest.Mock).mockReturnValue({ products: mockProducts });
    render(<DailyHighlights />);
    const productCards = screen.getAllByTestId('list-item');
    expect(productCards).toHaveLength(5);
    expect(screen.getByText(mockProducts[0].name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProducts[0].price}`)).toBeInTheDocument();
  });

  it('should navigate to the product details page when a product card is clicked', () => {
    const mockProducts = [
      { uid: 1, imageUrl: 'image1.jpg', name: 'Product 1', price: 10 },
      { uid: 2, imageUrl: 'image2.jpg', name: 'Product 2', price: 20 },
      { uid: 3, imageUrl: 'image3.jpg', name: 'Product 3', price: 30 },
      { uid: 4, imageUrl: 'image4.jpg', name: 'Product 4', price: 40 },
      { uid: 5, imageUrl: 'image5.jpg', name: 'Product 5', price: 50 }
    ];
    (useProducts as jest.Mock).mockReturnValue({ products: mockProducts });
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    render(<DailyHighlights />);
    const productCards = screen.getAllByTestId('list-item');
    fireEvent.click(productCards[0]);
    expect(mockNavigate).toHaveBeenCalledWith(`/product/${mockProducts[0].uid}`);
  });

  it('should call the fetchProductsApi thunk on mount', () => {
    render(<DailyHighlights />);
    expect(fetchProductsApi).toHaveBeenCalledWith({ pagNext: null, pageSize: 30 });
  });
});
