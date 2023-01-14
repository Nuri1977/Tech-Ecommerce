import { User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase/firebaseConfig';
import { CurrentUser } from '../../config/interfaces/intefaces';

export const registerUserApi = async (userAuth: User | null, otherData?: any) => {
  if (!userAuth) return;
  const { uid } = userAuth;
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    const userObj: CurrentUser = {
      uid: userAuth.uid,
      displayName: userAuth.displayName,
      email: userAuth.email,
      timeStamp: new Date().toISOString(),
      userRoles: ['user'],
      ...otherData
    };
    const resp = await setDoc(doc(db, 'users', uid), userObj).then(() => userObj);
    return resp;
  }
};
