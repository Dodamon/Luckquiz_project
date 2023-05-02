import styles from './App.module.css';
import { Outlet } from 'react-router-dom';
Object.assign(global, { WebSocket });

function App() {

  return (
    <div className={styles.appContainer}>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
