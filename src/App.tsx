import React from 'react';
import Header from './components/Header/Header';
import { Routes, Route } from 'react-router-dom';
import './default.scss';
import Homepage from './pages/Homepage/Homepage';
import Registration from './pages/Registration/Registration';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
