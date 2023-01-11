import { User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

export const registerUserApi = async (userAuth: User | null, otherData?: any) => {
  if (!userAuth) return;
  const { uid } = userAuth;
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    // doc.data() will be undefined in this case
    const resp = await setDoc(doc(db, 'users', uid), {
      uid: userAuth.uid,
      displayName: userAuth.displayName,
      email: userAuth.email,
      ...otherData
    });
    return resp;
  }
};
