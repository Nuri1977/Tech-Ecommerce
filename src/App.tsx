import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
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
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Checkout from './pages/Checkout/Checkout';
import Payment from './pages/Payment/Payment';
import Orders from './pages/Orders/Orders';
import Categories from './components/AdminCategories/Categories';
import Users from './pages/Users/Users';

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
              <Route path="/" element={<Homepage />} />
            </Route>
            <Route path="/" element={<MainLayout />}>
              <Route path="/registration" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/recovery" element={<Recovery />} />
              <Route path="/search" element={<Search />} />
              <Route path="/search/:filter" element={<Search />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route element={<WithAuth />}>
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payments" element={<Payment />} />
              </Route>
            </Route>
            <Route path="/" element={<AdminLayout />}>
              <Route element={<WithAdminAuth />}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/admin-orders" element={<Orders />} />
                <Route path="/users" element={<Users />} />
              </Route>
            </Route>
            <Route path="/" element={<DashboardLayout />}>
              <Route element={<WithAuth />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/myacount" element={<MyAccount />} />
                <Route path="/orders" element={<Orders />} />
              </Route>
            </Route>
          </Routes>
        )}
      </>
    </div>
  );
}

export default App;
