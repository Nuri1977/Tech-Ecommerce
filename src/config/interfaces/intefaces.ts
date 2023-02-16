import { PaymentIntent } from '@stripe/stripe-js';
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
  isAdmin?: boolean;
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

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  cartItems: CartItem[];
}

export interface Order {
  uid: string;
  user: CurrentUser | null;
  items: CartItem[];
  amount: number;
  createDate: Timestamp;
  payment: PaymentIntent | undefined;
}

export interface OrderState {
  orders: Order[];
  loading: boolean;
  ordersError: string | undefined;
}
