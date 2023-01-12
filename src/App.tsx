import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './default.scss';
import Homepage from './pages/Homepage/Homepage';
import Registration from './pages/Registration/Registration';
import MainLayout from './Layouts/MainLayout';
import HomepageLayout from './Layouts/HomepageLayout';
import Login from './pages/Login/Login';
import Recovery from './pages/Recovery/Recovery';
import useAuth from './hooks/useAuth';
import AuthStateChanged from './components/OnAuthStateChanged.tsx/AuthStateChanged';

function App() {
  const { currentUser } = useAuth();
  return (
    <div className="App">
      <AuthStateChanged />
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
