import React from 'react';
import { render, screen } from '../../../test-utils';
import userEvent from '@testing-library/user-event';
import DailyHighlights from './DailyHighlights';
// import { fetchProductsApi } from '../../../redux/products/productsThunk';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate // Return an empty jest function to test whether it was called or not...I'm not depending on the results so no need to put in a return value
}));

describe('DailyHighlights component', () => {
  test('renders daily highlights title correctly', () => {
    render(<DailyHighlights />);
    expect(screen.getByText(/daily highlights/i)).toBeInTheDocument();
  });

  test('renders products correctly', () => {
    const mockedFilteredProducts = [
      { uid: '1', imageUrl: 'test_url_1', name: 'Test Product 1', price: '50' },
      { uid: '2', imageUrl: 'test_url_2', name: 'Test Product 2', price: '60' },
      { uid: '3', imageUrl: 'test_url_3', name: 'Test Product 3', price: '70' },
      { uid: '4', imageUrl: 'test_url_4', name: 'Test Product 4', price: '80' },
      { uid: '5', imageUrl: 'test_url_5', name: 'Test Product 5', price: '90' }
    ];
    jest.spyOn(require('../../../hooks/useProducts'), 'default').mockReturnValue({
      products: mockedFilteredProducts
    });
    render(<DailyHighlights />);
    expect(screen.getByRole('heading', { name: /daily highlights/i })).toBeInTheDocument;
    expect(screen.queryAllByTestId('list-item')).toHaveLength(5);
    expect(screen.queryByText('Test')).not.toBeInTheDocument();
    mockedFilteredProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
    });
    const cardDiv = screen.queryAllByTestId('list-item');
    expect(cardDiv[0]).toBeInTheDocument();
    userEvent.click(cardDiv[0]);
    // expect(mockedUsedNavigate).toBeCalledTimes(1);
  });

  // test('calls fetchProductsApi when component mounts', () => {
  //   const mockedDispatch = jest.fn();
  //   jest
  //     .spyOn(require('../../../redux/app/hooks'), 'useAppDispatch')
  //     .mockReturnValue(mockedDispatch);
  //   render(<DailyHighlights />);
  //   expect(mockedDispatch).toHaveBeenCalledWith(fetchProductsApi({ pagNext: null, pageSize: 30 }));
  // });
});
