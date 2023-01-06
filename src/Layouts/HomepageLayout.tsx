import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

const HomepageLayout = () => {
  return (
    <div className="fullHeight">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomepageLayout;
