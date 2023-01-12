import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './default.scss';
import Homepage from './pages/Homepage/Homepage';
import Registration from './pages/Registration/Registration';
import MainLayout from './Layouts/MainLayout';
import HomepageLayout from './Layouts/HomepageLayout';
import Login from './pages/Login/Login';
import { auth } from './firebase/firebaseConfig';
import Recovery from './pages/Recovery/Recovery';
import { registerUserApi } from './redux/authentication/userApiCalls';
import { setAuth } from './redux/authentication/authSlice';
import { onAuthStateChanged, User } from 'firebase/auth';
import { CurrentUser } from './interfaces/intefaces';
import useAuth from './hooks/useAuth';

function App() {
  const { currentUser, dispatch } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth: User | null) => {
      if (!userAuth) {
        dispatch(setAuth(null));
      } else {
        registerUserApi(userAuth);
        const currentUser: CurrentUser = {
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          email: userAuth.email,
          photoUrl: userAuth.photoURL
        };
        dispatch(setAuth(currentUser));
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomepageLayout />}>
          <Route index path="/" element={<Homepage />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route
            path="/registration"
            element={currentUser ? <Navigate to="/" /> : <Registration />}
          />
          <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
          <Route path="/recovery" element={currentUser ? <Navigate to="/" /> : <Recovery />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
