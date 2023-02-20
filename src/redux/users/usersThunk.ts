import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  limit,
  setDoc,
  // Timestamp,
  updateDoc,
  QueryDocumentSnapshot,
  DocumentData,
  startAfter
} from 'firebase/firestore';
import { db } from '../../config/firebase/firebaseConfig';
import { CurrentUser } from '../../config/interfaces/intefaces';

export const addUserApi = createAsyncThunk('users/adduserApi', async (user: CurrentUser) => {
  const response = await setDoc(doc(db, 'users', user.uid), user).then(() => user);
  return response;
});

export const fetchUsersApi = createAsyncThunk(
  'users/fetchUsersApi',
  async ({
    pagNext,
    pageSize
  }: {
    pagNext: QueryDocumentSnapshot<DocumentData> | null;
    pageSize: number;
  }) => {
    const usersRef = collection(db, 'users');
    let first = query(usersRef, orderBy('email', 'desc'), limit(pageSize));

    if (pagNext) {
      first = query(usersRef, orderBy('email', 'desc'), startAfter(pagNext), limit(pageSize));
    }

    const response = await getDocs(first).then((documentSnapshots) => {
      const res: {
        users: CurrentUser[];
        paginateNext: QueryDocumentSnapshot<DocumentData> | null;
      } = {
        users: [],
        paginateNext: null
      };
      documentSnapshots.forEach((doc) => {
        res.users.push({
          displayName: '',
          email: '',
          ...doc.data(),
          uid: doc.id
        });
      });
      res.paginateNext = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      return res;
    });
    return response;
  }
);

export const deleteUserApi = createAsyncThunk('users/deleteUserApi', async (userId: string) => {
  const response = deleteDoc(doc(db, 'users', userId)).then(() => userId);
  return response;
});

export const updateUserApi = createAsyncThunk('users/updateUserApi', async (user: CurrentUser) => {
  const response = await updateDoc(doc(db, 'users', user.uid), { ...user }).then(() => user);
  return response;
});
