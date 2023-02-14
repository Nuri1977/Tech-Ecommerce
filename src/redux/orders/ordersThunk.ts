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
  where
} from 'firebase/firestore';
import { db } from '../../config/firebase/firebaseConfig';
import { Order } from '../../config/interfaces/intefaces';

export const addOrderApi = createAsyncThunk('orders/addOprderApi', async (order: Order) => {
  const response = await setDoc(doc(db, 'orders', order.uid), order).then(() => order);
  return response;
});

export const fetchOrdersApi = createAsyncThunk('orders/fetchOrdersApi', async () => {
  const response = await getDocs(collection(db, 'orders')).then((querySnapshot) => {
    const res: Order[] = [];
    querySnapshot.forEach((doc) => {
      res.push({
        items: [],
        amount: 0,
        createDate: Timestamp.now(),
        payment: undefined,
        user: null,
        ...doc.data(),
        uid: doc.id
      });
    });
    return res;
  });
  return response;
});

export const fetchUserOrdersApi = createAsyncThunk(
  'orders/fetchUserOrdersApi',
  async (userUid: string) => {
    const ordersRef = collection(db, 'orders');
    const first = query(ordersRef, where('user.uid', '==', userUid), orderBy('createDate', 'desc'));
    const response = await getDocs(first).then((querySnapshot) => {
      const res: Order[] = [];
      querySnapshot.forEach((doc) => {
        res.push({
          items: [],
          amount: 0,
          createDate: Timestamp.now(),
          payment: undefined,
          user: null,
          ...doc.data(),
          uid: doc.id
        });
      });
      return res;
    });
    return response;
  }
);

export const deleteOrderApi = createAsyncThunk(
  'orderss/deleteOrderApi',
  async (orderId: string) => {
    const response = deleteDoc(doc(db, 'orders', orderId)).then(() => orderId);
    return response;
  }
);
