import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
Object.assign(global, { WebSocket });

function App() {
  return (
    <div className={styles.app}>
      <ToastContainer
        limit={1}
        hideProgressBar
        autoClose={1500}
        className={styles.toastContainer}
        toastClassName={styles.toast}
        theme="colored"
      />
      <Outlet></Outlet>
    </div>
  );
}

export default App;
