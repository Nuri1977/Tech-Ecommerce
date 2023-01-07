import React from 'react';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import { CurrentUser } from '../interfaces/intefaces';

const MainLayout = ({ currentUser }: { currentUser: CurrentUser | null }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="main">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
