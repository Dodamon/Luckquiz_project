import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
Object.assign(global, { WebSocket });

function App() {
  return (
    <div className={styles.app}>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
