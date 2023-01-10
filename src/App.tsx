import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './default.scss';
import Homepage from './pages/Homepage/Homepage';
import Registration from './pages/Registration/Registration';
import MainLayout from './Layouts/MainLayout';
import HomepageLayout from './Layouts/HomepageLayout';
import Login from './pages/Login/Login';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import { CurrentUser } from './interfaces/intefaces';
import { registerUserApi } from './redux/users/userApiCalls';
import Recovery from './pages/Recovery/Recovery';

function App() {
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth: User | null) => {
      if (!userAuth) {
        setUser(null);
      } else {
        registerUserApi(userAuth);
        const currentUser: CurrentUser = {
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          email: userAuth.email,
          photoUrl: userAuth.photoURL
        };
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomepageLayout currentUser={user} />}>
          <Route index path="/" element={<Homepage />} />
        </Route>
        <Route path="/" element={<MainLayout currentUser={user} />}>
          <Route path="/registration" element={user ? <Navigate to="/" /> : <Registration />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/recovery" element={user ? <Navigate to="/" /> : <Recovery />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
