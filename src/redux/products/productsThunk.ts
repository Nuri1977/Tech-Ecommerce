import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where
} from 'firebase/firestore';
import { db } from '../../config/firebase/firebaseConfig';
import { Product } from '../../config/interfaces/intefaces';

export const addProductApi = createAsyncThunk(
  'products/addProductApi',
  async (product: Product) => {
    const response = await setDoc(doc(db, 'products', product.uid), product).then(() => product);
    return response;
  }
);

export const fetchProductsApi = createAsyncThunk(
  'products/fetchProductsApi',
  async (limit?: string) => {
    const productsRef = collection(db, 'products');
    let q = query(productsRef, orderBy('createDate', 'desc'));
    if (limit !== undefined)
      q = query(productsRef, where('category.uid', '==', limit), orderBy('createDate', 'desc'));
    const response = await getDocs(q).then((querySnapshot) => {
      const res: Product[] = [];
      querySnapshot.forEach((doc) => {
        res.push({
          name: '',
          category: { uid: '', name: '' },
          imageUrl: '',
          price: 0,
          createDate: Timestamp.now(),
          ...doc.data(),
          uid: doc.id
        });
      });
      return res;
    });
    return response;
  }
);

export const deleteProductApi = createAsyncThunk(
  'products/deleteProductApi',
  async (productId: string) => {
    const response = deleteDoc(doc(db, 'products', productId)).then(() => productId);
    return response;
  }
);

export const updateProductApi = createAsyncThunk(
  'products/updateProductApi',
  async (product: Product) => {
    const response = await updateDoc(doc(db, 'products', product.uid), { ...product }).then(
      () => product
    );
    return response;
  }
);
