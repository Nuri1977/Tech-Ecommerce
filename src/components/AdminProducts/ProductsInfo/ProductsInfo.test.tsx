import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductsInfo from './ProductsInfo';
import { deleteProductApi, fetchProductsApi } from '../../../redux/products/productsThunk';

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
  fetchProductsApi: jest.fn(),
  deleteProductApi: jest.fn()
}));

describe('ProductsInfo', () => {
  test('renders products list', () => {
    render(<ProductsInfo categories={mockCategories} />);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  test('opens modal on edit button click', async () => {
    render(<ProductsInfo categories={mockCategories} />);
    const editButtons = screen.getAllByTestId('edit');
    expect(editButtons.length).toBe(2);

    userEvent.click(editButtons[0]);

    await waitFor(() => expect(screen.getByTestId('modal')).toBeInTheDocument());
  });

  test('deletes product on delete button click', async () => {
    render(<ProductsInfo categories={mockCategories} />);

    const deleteButtons = screen.getAllByRole('button', { name: 'Delete' });
    expect(deleteButtons.length).toBe(2);
    userEvent.click(deleteButtons[0]);
    expect(fetchProductsApi).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(deleteProductApi).toHaveBeenCalledTimes(1));
  });

  test('paginations next button is disabled', async () => {
    render(<ProductsInfo categories={mockCategories} />);
    expect(fetchProductsApi).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(fetchProductsApi).toHaveBeenCalledWith({
        categoryUid: '',
        pagNext: null,
        pageSize: 8
      });
    });
    userEvent.click(screen.getByText('Next'));
    // button is disabled and fetchProductApi is not called again and page is not changed
    await waitFor(() => {
      expect(fetchProductsApi).toHaveBeenCalledTimes(1);
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });
});
