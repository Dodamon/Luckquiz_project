import { Icon } from "@iconify/react";
import styles from "./QuizFourContent.module.css";
import QuizGameTitle from "components/common/QuizGameTitle";
import { useSelector } from "react-redux";
import { RootState } from "store";


const QuizFourAnswer = () => {
  const content = useSelector((state: RootState) => state.socket.quizItem!);

  return (
    // <div className={styles.QuizFourContent}>
      <div className={styles.content_answerbox}>
        <div
          className={styles.content_answer}
          style={content.answer !== "one" ? { opacity: "50%" } : {}}
        >
          <div className={styles.content_color} style={{ backgroundColor: "var(--select-one)" }}>
            <div>
              <Icon icon="material-symbols:circle-outline" />
            </div>
          </div>
          <div className={styles.content_input}>
            <input type="text" disabled value={content.one} />
          </div>
        </div>

        <div
          className={styles.content_answer}
          style={content.answer !== "two" ? { opacity: "50%" } : {}}
        >
          <div className={styles.content_color} style={{ backgroundColor: "var( --select-two)" }}>
            <div>
              <Icon icon="ph:triangle-bold" />
            </div>
          </div>
          <div className={styles.content_input}>
            <input type="text" disabled value={content.two} />
          </div>
        </div>

        <div
          className={styles.content_answer}
          style={content.answer !== "three" ? { opacity: "50%" } : {}}
        >
          <div className={styles.content_color} style={{ backgroundColor: "var( --select-three)" }}>
            <div>
              <Icon icon="ph:x-bold" />
            </div>
          </div>
          <div className={styles.content_input}>
            <input type="text" disabled value={content.three} />
          </div>
        </div>

        <div
          className={styles.content_answer}
          style={content.answer !== "four" ? { opacity: "50%" } : {}}
        >
          <div className={styles.content_color} style={{ backgroundColor: "var(--select-four)" }}>
            <div>
              <Icon icon="material-symbols:square-outline-rounded" />
            </div>
          </div>
          <div className={styles.content_input}>
            <input type="text" disabled value={content.four} />
          </div>
        </div>
      </div>
    // </div>
  );
};

export default QuizFourAnswer;
