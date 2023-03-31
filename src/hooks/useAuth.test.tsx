import { renderHook } from '@testing-library/react';
import useAuth from './useAuth';

// Mocking the Redux store and dependencies for the hook
jest.mock('../redux/app/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn()
}));

// Mocking the Redux selector function for the hook
jest.mock('../redux/authentication/authSlice', () => ({
  selectAuth: jest.fn()
}));

describe('useAuth', () => {
  it('returns the expected values when currentUser is an admin', () => {
    // Mocking the Redux store and selector function return values
    const currentUser = {
      userRoles: ['admin'],
      isAdmin: true
    };
    const loading = false;
    const authError = null;
    const resetPassword = jest.fn();
    const dispatch = jest.fn();
    const useAppSelectorMock = jest.fn().mockReturnValue({
      currentUser,
      loading,
      authError,
      resetPassword
    });
    const useAppDispatchMock = jest.fn().mockReturnValue(dispatch);
    const selectAuthMock = jest.fn().mockReturnValue({
      currentUser,
      loading,
      authError,
      resetPassword
    });
    require('../redux/app/hooks').useAppSelector.mockImplementation(useAppSelectorMock);
    require('../redux/app/hooks').useAppDispatch.mockImplementation(useAppDispatchMock);
    require('../redux/authentication/authSlice').selectAuth.mockImplementation(selectAuthMock);

    // Calling the hook and checking the return value
    const { result } = renderHook(() => useAuth());
    expect(result.current.currentUser).toEqual(currentUser);
    expect(result.current.isAdmin).toBe(true);
    expect(result.current.loading).toBe(loading);
    expect(result.current.authError).toBe(authError);
    expect(result.current.resetPassword).toBe(resetPassword);
    expect(result.current.dispatch).toBe(dispatch);
  });

  it('returns the expected values when currentUser is not an admin', () => {
    // Mocking the Redux store and selector function return values
    const currentUser = {
      userRoles: ['member'],
      isAdmin: false
    };
    const loading = false;
    const authError = null;
    const resetPassword = jest.fn();
    const dispatch = jest.fn();
    const useAppSelectorMock = jest.fn().mockReturnValue({
      currentUser,
      loading,
      authError,
      resetPassword
    });
    const useAppDispatchMock = jest.fn().mockReturnValue(dispatch);
    const selectAuthMock = jest.fn().mockReturnValue({
      currentUser,
      loading,
      authError,
      resetPassword
    });
    require('../redux/app/hooks').useAppSelector.mockImplementation(useAppSelectorMock);
    require('../redux/app/hooks').useAppDispatch.mockImplementation(useAppDispatchMock);
    require('../redux/authentication/authSlice').selectAuth.mockImplementation(selectAuthMock);

    // Calling the hook and checking the return value
    const { result } = renderHook(() => useAuth());
    expect(result.current.currentUser).toEqual(currentUser);
    expect(result.current.isAdmin).toBe(false);
    expect(result.current.loading).toBe(loading);
    expect(result.current.authError).toBe(authError);
    expect(result.current.resetPassword).toBe(resetPassword);
    expect(result.current.dispatch).toBe(dispatch);
  });
});
