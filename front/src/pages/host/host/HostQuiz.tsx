import { Outlet } from "react-router-dom";
import styles from "./HostQuiz.module.css"

const HostQuiz = () => {

  return (
    <div className={styles.hostQuizContainer}>
      <Outlet></Outlet>
    </div>
  );
};

export default HostQuiz;
