import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import UserModal from './UserModal';
import { BrowserRouter } from 'react-router-dom';
import { CurrentUser } from '../../../config/interfaces/intefaces';
import thunk from 'redux-thunk';

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

describe('UserModal component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      authUser: {
        currentUser: null,
        loading: false,
        authError: '',
        resetPassword: ''
      }
    });
  });

  test('renders login and registration links when user is not logged in', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserModal />
        </BrowserRouter>
      </Provider>
    );
    const registrationLink = screen.getByText(/registration/i);
    const loginLink = screen.getByTestId('login');
    expect(registrationLink).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
  });

  test('renders dashboard link when user is logged in', () => {
    const currentUser: CurrentUser = {
      uid: '123',
      displayName: 'test',
      email: 'test@email.com'
    };
    store = mockStore({
      authUser: {
        currentUser,
        error: null,
        isLoading: false
      }
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserModal />
        </BrowserRouter>
      </Provider>
    );
    const dashboardLink = screen.getByText(/dashboard/i);
    expect(dashboardLink).toBeInTheDocument();
  });

  test('dispatches signOutFun when Logout link is clicked', async () => {
    const currentUser: CurrentUser = {
      uid: '123',
      displayName: 'test',
      email: 'test@email.com'
    };
    store = mockStore({
      authUser: {
        currentUser,
        error: null,
        isLoading: false
      }
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserModal />
        </BrowserRouter>
      </Provider>
    );
    const logoutLink = screen.getByText('Logout');
    await userEvent.click(logoutLink);
    expect(store.getActions().map((action: any) => action.type)).toEqual([
      'users/signOutFun/pending',
      'cart/clearCart',
      'users/signOutFun/fulfilled'
    ]);
  });
});
