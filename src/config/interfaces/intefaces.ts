import { DocumentData, QueryDocumentSnapshot, Timestamp } from 'firebase/firestore';

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
  category: Category;
  imageUrl: string;
  price: number;
  createDate: Timestamp;
  description: string;
}

export interface ProductState {
  products: Product[];
  paginatePrevious: QueryDocumentSnapshot<DocumentData> | null;
  paginateNext: QueryDocumentSnapshot<DocumentData> | null;
  loading: boolean;
  productsError: string | undefined;
}

export interface Category {
  uid: string;
  name: string;
}

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  categoriesError: string | undefined;
}
