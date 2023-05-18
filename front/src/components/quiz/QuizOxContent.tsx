import { Icon } from "@iconify/react";
import { useState } from "react";
import styles from "./QuizOxContent.module.css";
import { getQuizItem, setQuizItem } from "models/quiz";
import QuizGameTitle from "components/common/QuizGameTitle";
import { useSelector } from "react-redux";
import { RootState } from "store";

type QuizOxContentProps = {
  handleAnswer?: Function;
};

const QuizOxContent = ({ handleAnswer }: QuizOxContentProps) => {
  const [item, setItem] = useState("");
  const content = useSelector((state: RootState) => state.socket.quizItem!);
  const isHost = useSelector((state: RootState) => state.auth.isAuthenticated);

  const answerHandler = (answer: string) => {
    setItem(answer);
    handleAnswer && handleAnswer(answer);
  };
  return (
    <div>
      <div className={styles.QuizOxContent}>
        {/* <div className={styles.content_title}>
                <input type="text" disabled value={"문제입니다"}/>
            </div> */}
        <QuizGameTitle title={content.question} />

        {content.quizUrl && (
          <div className={styles.content_images}>
            <img src={content.quizUrl} alt="좋아" />
          </div>
        )}

        <div className={styles.content_answerbox}>
          <div
            className={styles.content_answer}
            onClick={() => !isHost && answerHandler("o")}
            style={item === "o" ? { opacity: "70%" } : {}}
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
            onClick={() => !isHost && answerHandler("x")}
            style={item === "x" ? { opacity: "70%" } : {}}
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
    </div>
  );
};

export default QuizOxContent;
