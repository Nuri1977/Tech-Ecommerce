import React from 'react';
import UserProfile from '../UserProfile/UserProfile';
import './VertikalNav.scss';

const VertikalNav = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="verticalNav">
      <UserProfile />

      <div className="menu-vertical">{children}</div>
    </div>
  );
};

export default VertikalNav;
