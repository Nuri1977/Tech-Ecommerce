import React, { useEffect } from 'react';
import UserDetail from '../../components/UserDetail/UserDetail';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { selectUsres } from '../../redux/users/usersSlice';
import { fetchUsersApi } from '../../redux/users/usersThunk';
import './Users.scss';

const Users = () => {
  const dispatch = useAppDispatch();
  const { users, loading, usersError } = useAppSelector(selectUsres);

  useEffect(() => {
    dispatch(fetchUsersApi({ pagNext: null, pageSize: 50 }));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (usersError) return <div>{usersError}</div>;

  return (
    <div className="users">
      <h2>Users</h2>
      <div className="userDetail">
        {users.map((user) => (
          <UserDetail key={user.uid} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Users;
