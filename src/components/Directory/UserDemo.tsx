import React, { useEffect } from 'react';

const UserDemo = () => {
  const [users, setUsers] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    const result = await fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error('Error');
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
    const data = await result;
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p data-testid="error">Error...</p>;

  return (
    <>
      <ul data-testid="user-list">
        {users.map((user: any) => (
          <li key={user.id} data-testid="user-list-item">
            <p>{user.name}</p>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UserDemo;
