import { rest } from 'msw';
import { mockError } from '../../mocks/resolvers/mockError';
import { server } from '../../mocks/server';
import { render, screen } from '../../test-utils';
import UserDemo from './UserDemo';

describe('UserDemo', () => {
  test('should render the user list', async () => {
    render(<UserDemo />);
    const userList = await screen.findByTestId('user-list');
    expect(userList).toBeInTheDocument();
  });
  test('should render the user list items', async () => {
    render(<UserDemo />);
    const userListItems = await screen.findAllByTestId('user-list-item');
    expect(userListItems).toHaveLength(8);
  });
  test('should render the user list items with the correct name', async () => {
    render(<UserDemo />);
    const userListItems = await screen.findAllByTestId('user-list-item');
    expect(userListItems[0]).toHaveTextContent('Nuri Lacka');
  });
  test('should render error message when fetch fails', async () => {
    server.use(rest.get('https://jsonplaceholder.typicode.com/users', mockError));
    render(<UserDemo />);
    const errorMessage = await screen.findByTestId('error');
    expect(errorMessage).toHaveTextContent('Error...');
  });
});
