import React from 'react';
import { CurrentUser } from '../../config/interfaces/intefaces';
import './UserDetail.scss';

const UserDetail = ({ user }: { user: CurrentUser }) => {
  return (
    <div className="user">
      <div className="userImg">
        <img
          src={
            user.photoUrl ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU'
          }
          alt="user_image"
        />
      </div>
      <div className="userName">{user?.displayName || 'No name'}</div>
      <div className="userEmail">{user.email}</div>
      <div className="userRoles">
        {user?.userRoles?.reduce((role, curr) => '' + curr + ', ' + role)}
      </div>
    </div>
  );
};

export default UserDetail;
