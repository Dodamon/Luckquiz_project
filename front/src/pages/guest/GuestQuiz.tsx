import { Outlet } from "react-router-dom";
import styles from "./GuestQuiz.module.css";

const GuestQuiz = () => {
  return (
    <div className={styles.guestQuizContainer}>
      <Outlet></Outlet>
    </div>
  );
};

export default GuestQuiz;
