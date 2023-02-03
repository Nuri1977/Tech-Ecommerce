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
  where,
  Timestamp,
  QueryDocumentSnapshot,
  DocumentData,
  startAfter
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
  async ({
    pagNext,
    pageSize,
    categoryUid = undefined
  }: {
    pagNext: QueryDocumentSnapshot<DocumentData> | null;
    pageSize: number;
    categoryUid?: string;
  }) => {
    const productsRef = collection(db, 'products');
    let first = query(productsRef, orderBy('createDate', 'desc'), limit(pageSize));

    if (pagNext) {
      if (categoryUid !== undefined && categoryUid !== '') {
        first = query(
          productsRef,
          where('category.uid', '==', categoryUid),
          orderBy('createDate', 'desc'),
          startAfter(pagNext),
          limit(pageSize)
        );
      } else {
        first = query(
          productsRef,
          orderBy('createDate', 'desc'),
          startAfter(pagNext),
          limit(pageSize)
        );
      }
    } else {
      if (categoryUid !== undefined && categoryUid !== '') {
        first = query(
          productsRef,
          where('category.uid', '==', categoryUid),
          orderBy('createDate', 'desc'),
          limit(pageSize)
        );
      } else {
        first = query(productsRef, orderBy('createDate', 'desc'), limit(pageSize));
      }
    }

    const response = await getDocs(first).then((documentSnapshots) => {
      const res: {
        products: Product[];
        paginateNext: QueryDocumentSnapshot<DocumentData> | null;
      } = {
        products: [],
        paginateNext: null
      };
      documentSnapshots.forEach((doc) => {
        res.products.push({
          name: '',
          category: { uid: '', name: '' },
          imageUrl: '',
          price: 0,
          createDate: Timestamp.now(),
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
