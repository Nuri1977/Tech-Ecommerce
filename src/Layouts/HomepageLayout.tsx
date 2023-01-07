import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { CurrentUser } from '../interfaces/intefaces';

const HomepageLayout = ({ currentUser }: { currentUser: CurrentUser | null }) => {
  return (
    <div className="fullHeight">
      <Header currentUser={currentUser} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomepageLayout;
