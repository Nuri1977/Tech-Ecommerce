import React from 'react';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
  return (
    <div>
      <Header />
      <div className="main">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
