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

export interface Product {
  uid: string;
  name: string;
  categoryId: string;
  imageUrl: string;
  price: number;
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  productsError: string | undefined;
}
