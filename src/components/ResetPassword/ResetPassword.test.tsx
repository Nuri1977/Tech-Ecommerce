import { render, screen, fireEvent } from '@testing-library/react';
import ResetPassword from './ResetPassword';
// import { sendResetPassword } from '../../redux/authentication/authThunk';

jest.mock('../../hooks/useAuth', () => ({
  __esModule: true,
  default: () => ({
    resetPassword: null,
    authError: null,
    loading: false,
    dispatch: jest.fn()
  })
}));

describe('ResetPassword', () => {
  test('should display error message if email is not entered', async () => {
    render(<ResetPassword />);
    const submitButton = screen.getByText('Send email');
    fireEvent.click(submitButton);
    const errorMessage = await screen.findByText('Fields can not be blank');
    expect(errorMessage).toBeInTheDocument();
  });

  // test('should call sendResetPassword with email when form is submitted', async () => {
  //   const mockDispatch = jest.fn();
  //   jest.mock('../../hooks/useAuth', () => ({
  //     __esModule: true,
  //     default: () => ({
  //       resetPassword: null,
  //       authError: null,
  //       loading: false,
  //       dispatch: mockDispatch
  //     })
  //   }));
  //   render(<ResetPassword />);
  //   const emailInput = screen.getByPlaceholderText('Email');
  //   const submitButton = screen.getByText('Send email');
  //   const email = 'test@test.com';
  //   fireEvent.change(emailInput, email);
  //   fireEvent.click(submitButton);
  //   await waitFor(() => expect(mockDispatch).toHaveBeenCalledTimes(1));
  //   expect(mockDispatch).toHaveBeenCalledWith(sendResetPassword(email));
  // });
});
