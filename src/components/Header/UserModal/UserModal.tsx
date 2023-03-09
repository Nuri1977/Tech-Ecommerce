import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { useAppDispatch } from '../../../redux/app/hooks';
import { signOutFun } from '../../../redux/authentication/authThunk';
import './UserModal.scss';

const UserModal = () => {
  const { currentUser, isAdmin } = useAuth();
  const dispatch = useAppDispatch();

  return (
    <ul className="userModalDetail">
      {!currentUser && (
        <>
          <li className="navItem">
            <NavLink to="/registration" className="navLink">
              Registration
            </NavLink>
          </li>
          <li className="navItem">
            <NavLink to="/login" className="navLink">
              Login
            </NavLink>
          </li>
        </>
      )}
      {currentUser && isAdmin && (
        <li className="navItem">
          <NavLink to="/admin" className="navLink">
            Admin
          </NavLink>
        </li>
      )}
      {currentUser && !isAdmin && (
        <li className="navItem">
          <NavLink to="/dashboard" className="navLink">
            Dashboard
          </NavLink>
        </li>
      )}
      {currentUser && (
        <li className="navItem">
          <a onClick={() => dispatch(signOutFun())} className="navLink">
            Logout
          </a>
        </li>
      )}
    </ul>
  );
};

export default UserModal;
