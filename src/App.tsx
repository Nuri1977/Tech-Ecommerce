import React from 'react';
import Header from './components/Header/Header';
import './default.scss';
import Homepage from './pages/Homepage/Homepage';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <Homepage />
      </main>
    </div>
  );
}

export default App;
