import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>LuckQuiz?</h1>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
