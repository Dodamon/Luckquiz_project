import { Icon } from "@iconify/react";
import styles from "./QuizOxContent.module.css";
import QuizGameTitle from "components/common/QuizGameTitle";
import { useSelector } from "react-redux";
import { RootState } from "store";

const QuizOxAnswer = () => {
  const content = useSelector((state: RootState) => state.socket.quizItem!);

  return (
    <div className={styles.QuizOxContent}>
      <div className={styles.content_answerbox}>
        <div
          className={styles.content_answer}
          style={content.answer !== "o" ? { opacity: "50%" } : {}}
        >
          <div className={styles.content_color} style={{ backgroundColor: "var(--select-two)" }}>
            <div>
              <Icon icon="material-symbols:circle-outline" />
            </div>
          </div>
          <div className={styles.content_input}>
            <input type="text" disabled value={"맞다"} />
          </div>
        </div>

        <div
          className={styles.content_answer}
          style={content.answer !== "x" ? { opacity: "50%" } : {}}
        >
          <div className={styles.content_color} style={{ backgroundColor: "var( --select-one)" }}>
            <div>
              <Icon icon="ph:x-bold" />
            </div>
          </div>
          <div className={styles.content_input}>
            <input type="text" disabled value={"아니다"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizOxAnswer;
