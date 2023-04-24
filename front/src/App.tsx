import React from 'react';
import styles from './App.module.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className={styles.appContainer}>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
