import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import SignIn from './SignIn';
import { signInEmailPassword } from '../../redux/authentication/authThunk';
import useAuth from '../../hooks/useAuth';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../redux/authentication/authThunk');
jest.mock('../../redux/authentication/authSlice');
jest.mock('../../hooks/useAuth');

const mockDispatch = jest.fn();

describe('SignIn component', () => {
  let store;
  let component: any;

  beforeEach(() => {
    store = mockStore({
      currentUser: null,
      loading: false,
      authError: null
    });

    (useAuth as jest.Mock).mockReturnValue({
      currentUser: null,
      loading: false,
      authError: null,
      dispatch: mockDispatch
    });

    component = render(
      <Provider store={store}>
        <MemoryRouter>
          <SignIn />
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the email and password input fields', () => {
    const emailInput = component.getByPlaceholderText('Email');
    const passwordInput = component.getByPlaceholderText('Password');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('updates the email and password state when the user types into the input fields', () => {
    const emailInput = component.getByPlaceholderText('Email');
    const passwordInput = component.getByPlaceholderText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('testpassword');
  });

  it('shows an error message if the user tries to submit the form without entering an email or password', async () => {
    const loginButton = component.getByText('Login');

    fireEvent.click(loginButton);

    const errorMessage = await component.findByText('Fields can not be blank');
    expect(errorMessage).toBeInTheDocument();
  });

  // it('disables login button if loading is true', () => {
  //   store = mockStore({
  //     currentUser: null,
  //     loading: true, // set loading state to true
  //     authError: null
  //   });

  //   component.rerender(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <SignIn />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   const loginButton = component.getByTestId('login-btn');
  //   expect(loginButton).toBeDisabled();
  // });
  it('dispatches signInEmailPassword action with email and password on form submit', () => {
    const emailInput = component.getByPlaceholderText('Email');
    const passwordInput = component.getByPlaceholderText('Password');
    const loginButton = component.getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(loginButton);

    expect(signInEmailPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'testpassword'
    });
  });
  it('redirects to forgot password page', async () => {
    const redirect = await component.findByText(/Forgot Password?/i);
    expect(redirect).toBeInTheDocument();
  });
  // it('shows an error message if authError exists', async () => {
  //   store = mockStore({
  //     currentUser: null,
  //     loading: false,
  //     authError: 'Invalid email or password'
  //   });

  //   component.rerender(
  //     <Provider store={store}>
  //       <MemoryRouter>
  //         <SignIn />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   await act(async () => {
  //     // Wait for component to rerender after setting authError
  //     await waitFor(() => {
  //       const errorMessage = component.findByTestId('error');
  //       expect(errorMessage).toBeInTheDocument();
  //     });
  //   });
  // });
});
