import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase/firebaseConfig';
import { Product } from '../../config/interfaces/intefaces';

export const addProductApi = createAsyncThunk(
  'products/addProductApi',
  async (product: Product) => {
    const response = await setDoc(doc(db, 'products', product.uid), product).then(() => product);
    return response;
  }
);

export const fetchProductsApi = createAsyncThunk('products/fetchProductsApi', async () => {
  const response = await getDocs(collection(db, 'products')).then((querySnapshot) => {
    const res: Product[] = [];
    querySnapshot.forEach((doc) => {
      res.push({
        name: '',
        category: { uid: '', name: '' },
        imageUrl: '',
        price: 0,
        ...doc.data(),
        uid: doc.id
      });
    });
    return res;
  });
  return response;
});

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
