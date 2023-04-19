import React, { useEffect } from 'react';
import Directory from '../../components/Directory/Directory';

import './Homepage.scss';

const Homepage = () => {
  useEffect(() => {
    document.title = 'Homepage';
  }, []);

  return (
    <div className="homepage">
      <Directory />
    </div>
  );
};

export default Homepage;
