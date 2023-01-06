import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';

const HomepageLayout = () => {
  return (
    <div className="fullHeight">
      <Header />
      <Outlet />
    </div>
  );
};

export default HomepageLayout;
