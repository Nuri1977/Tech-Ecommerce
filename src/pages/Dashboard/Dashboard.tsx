import React, { useEffect } from 'react';
import './Dashboard.scss';

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  return (
    <div className="dashboard">
      <h1>Welcome to your account</h1>
      <p>Under contruction ...</p>
    </div>
  );
};

export default Dashboard;
