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
  signInError: boolean;
  signInLoading: boolean;
  signInPopupError: string | undefined;
  signInPopupLoading: boolean;
  resetPasswordError: boolean;
  resetPasswordLoading: boolean;
  logoutError: string | undefined;
}
