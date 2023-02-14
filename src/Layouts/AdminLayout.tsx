import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import VertikalNav from '../components/VertikalNav/VertikalNav';
import useAuth from '../hooks/useAuth';
import { signOutFun } from '../redux/authentication/authThunk';

const AdminLayout = () => {
  const { dispatch } = useAuth();
  return (
    <div className="adminLayout">
      <Header />
      <div className="controlPanel">
        <div className="sidebar">
          <VertikalNav>
            <ul>
              <li>
                <Link to="/admin">Home</Link>
              </li>
              <li>
                <Link to="/categories">Categories</Link>
              </li>
              <li>
                <Link to="/admin-orders">Order History</Link>
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

export default AdminLayout;
