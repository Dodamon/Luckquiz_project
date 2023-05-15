import { Icon } from "@iconify/react";
import styles from "./QuizShortContent.module.css";
import QuizGameTitle from "components/common/QuizGameTitle";
import { RootState } from "store";
import { useSelector } from "react-redux";

const QuizShortAnswer = () => {
  const content = useSelector((state: RootState) => state.socket.quizItem!)

  return (
    <div className={styles.QuizShortContent}>
      <div className={styles.content_answerbox}>
        <div className={styles.content_answer}>
          {" "}
          <div className={styles.content_color} style={{ backgroundColor: "var( --button-two)" }}>
            <div>
              <Icon icon="ic:round-menu" />
            </div>
          </div>
          <div className={styles.content_input}>
              <input type="text" value={content.answer}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizShortAnswer;
