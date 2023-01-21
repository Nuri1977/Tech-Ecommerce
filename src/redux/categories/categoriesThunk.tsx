import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase/firebaseConfig';
import { Category } from '../../config/interfaces/intefaces';

export const addCategoryApi = createAsyncThunk(
  'categories/addCategoryApi',
  async (category: Category) => {
    const response = await setDoc(doc(db, 'categories', category.uid), category).then(
      () => category
    );
    return response;
  }
);

export const fetchCategoriesApi = createAsyncThunk('categories/fetchCategoriesApi', async () => {
  const response = await getDocs(collection(db, 'categories')).then((querySnapshot) => {
    const res: Category[] = [];
    querySnapshot.forEach((doc) => {
      res.push({
        name: '',
        ...doc.data(),
        uid: doc.id
      });
    });
    return res;
  });
  return response;
});

export const deleteCategoryApi = createAsyncThunk(
  'categories/deleteCategoryApi',
  async (categoryId: string) => {
    const response = deleteDoc(doc(db, 'categories', categoryId)).then(() => categoryId);
    return response;
  }
);

export const updateCategoryApi = createAsyncThunk(
  'categories/updateCategoryApi',
  async (category: Category) => {
    console.log(category.uid);
    const response = await updateDoc(doc(db, 'categories', category.uid), { ...category }).then(
      () => category
    );
    return response;
  }
);
