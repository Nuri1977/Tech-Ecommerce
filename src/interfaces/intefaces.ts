export interface CurrentUser {
  uid?: string;
  displayName: string | null;
  email: string | null;
  photoUrl?: string | null;
  password?: string;
  confirmPassword?: string;
}

export interface UserState {
  currentUser: CurrentUser | null;
  singUpSuccess: boolean;
  signUpError: string | undefined;
  signUpLoading: boolean;
  signInError: string | undefined;
  signInLoading: boolean;
  signInPopupError: string | undefined;
  signInPopupLoading: boolean;
  resetPassword: string;
  resetPasswordError: string | undefined;
  resetPasswordLoading: boolean;
  logoutError: string | undefined;
}
