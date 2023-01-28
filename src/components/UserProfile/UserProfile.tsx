import React from 'react';
import useAuth from '../../hooks/useAuth';
import UserImg from '../../assets/images/user.png';
import './UserProfile.scss';

const UserProfile = () => {
  const { currentUser } = useAuth();
  const photoUrl = currentUser?.photoUrl;
  const displayName = currentUser?.displayName;

  return (
    <div className="userProfile">
      <ul>
        <li>
          <div className="img">
            <img src={photoUrl ? photoUrl : UserImg} />
          </div>
        </li>
        <li>
          <span className="displayName">{displayName ? displayName : 'Admin'}</span>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
