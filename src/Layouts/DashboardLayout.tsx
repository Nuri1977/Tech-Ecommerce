import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import VertikalNav from '../components/VertikalNav/VertikalNav';
import useAuth from '../hooks/useAuth';
import { signOutFun } from '../redux/authentication/authThunk';

const DashboardLayout = () => {
  const { dispatch } = useAuth();

  return (
    <div className="dashboardLayout">
      <Header />
      <div className="controlPanel">
        <div className="sidebar">
          <VertikalNav>
            <ul>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => (isActive ? 'active-item' : 'inactive')}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/orders"
                  className={({ isActive }) => (isActive ? 'active-item' : 'inactive')}>
                  Order History
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/myacount"
                  className={({ isActive }) => (isActive ? 'active-item' : 'inactive')}>
                  My Account
                </NavLink>
              </li>
              <li>
                <span className="signOut" onClick={() => dispatch(signOutFun())}>
                  Sign Out
                </span>
              </li>
            </ul>
          </VertikalNav>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
