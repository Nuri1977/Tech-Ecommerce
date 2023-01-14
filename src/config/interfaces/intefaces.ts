export interface CurrentUser {
  uid?: string;
  displayName: string | null;
  email: string | null;
  photoUrl?: string | null;
  password?: string;
  confirmPassword?: string;
  timeStamp?: string | null;
  userRoles?: string[];
}

export interface UserState {
  currentUser: CurrentUser | null;
  loading: boolean;
  authError: string | undefined;
  resetPassword: string | undefined;
}
