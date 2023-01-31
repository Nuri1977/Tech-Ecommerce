import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './default.scss';
import Homepage from './pages/Homepage/Homepage';
import Registration from './pages/Registration/Registration';
import MainLayout from './Layouts/MainLayout';
import HomepageLayout from './Layouts/HomepageLayout';
import Login from './pages/Login/Login';
import Recovery from './pages/Recovery/Recovery';
import AuthStateChanged from './components/OnAuthStateChanged/AuthStateChanged';
import Dashboard from './pages/Dashboard/Dashboard';
import Admin from './pages/Admin/Admin';
import WithAdminAuth from './pages/HOC/WithAdminAuth';
import MyAccount from './components/MyAccount/MyAccount';
import WithAuth from './pages/HOC/WithAuth';
import AdminLayout from './Layouts/AdminLayout';
import DashboardLayout from './Layouts/DashboardLayout';
import Search from './pages/search/Search';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="App">
      <>
        <AuthStateChanged setIsLoading={setIsLoading} />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Routes>
            <Route path="/" element={<HomepageLayout />}>
              <Route index path="/" element={<Homepage />} />
            </Route>
            <Route path="/" element={<MainLayout />}>
              <Route path="/registration" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/recovery" element={<Recovery />} />
              <Route path="/search" element={<Search />} />
              <Route path="/search/:filter" element={<Search />} />
              <Route element={<WithAuth />}>
                <Route path="/myaccount" element={<MyAccount />} />
              </Route>
            </Route>
            <Route path="/" element={<AdminLayout />}>
              <Route element={<WithAdminAuth />}>
                <Route path="/admin" element={<Admin />} />
              </Route>
            </Route>
            <Route path="/" element={<DashboardLayout />}>
              <Route element={<WithAdminAuth />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Route>
          </Routes>
        )}
      </>
    </div>
  );
}

export default App;
