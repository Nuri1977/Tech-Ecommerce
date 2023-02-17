import React from 'react';
import { Link, Outlet } from 'react-router-dom';
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
                <Link to="/dashboard">Home</Link>
              </li>
              <li>
                <Link to="/orders">Order History</Link>
              </li>
              <li>
                <Link to="/myacount">My Account</Link>
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
