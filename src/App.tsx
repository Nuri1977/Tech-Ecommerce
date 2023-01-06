import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './default.scss';
import Homepage from './pages/Homepage/Homepage';
import Registration from './pages/Registration/Registration';
import MainLayout from './Layouts/MainLayout';
import HomepageLayout from './Layouts/HomepageLayout';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomepageLayout />}>
          <Route index path="/" element={<Homepage />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route path="/registration" element={<Registration />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
