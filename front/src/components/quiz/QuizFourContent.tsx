import { Icon } from "@iconify/react";
import { useState } from "react";
import logo from "../../../assets/images/timer1.png";
import styles from "./QuizFourContent.module.css";
import { getQuizItem, setQuizItem } from "models/quiz";
import QuizGameTitle from "components/common/QuizGameTitle";
import { useSelector } from "react-redux";
import { RootState } from "store";

type QuizFourContentProps = {
  handleAnswer?: Function;
};

const QuizFourContent = ({ handleAnswer }: QuizFourContentProps) => {
  const [item, setItem] = useState("");
  const content = useSelector((state: RootState) => state.socket.quizItem!);
  const isHost = useSelector((state: RootState) => state.auth.isAuthenticated);

  const answerHandler = (answer: string) => {
    setItem(answer);
    handleAnswer && handleAnswer(answer); // 보기에 담기 답을 직접 string으로 보내야함.
  };

  return (
    <div>
      <div className={styles.QuizFourContent}>
        {/* <div className={styles.content_title}>
                <input type="text" value={content.game} />
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
            onClick={() => !isHost && answerHandler("one")}
            style={item === "one" ? { opacity: "70%" } : {}}
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
            onClick={() => !isHost && answerHandler("two")}
            style={item === "two" ? { opacity: "70%" } : {}}
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
            onClick={() => !isHost && answerHandler("three")}
            style={item === "three" ? { opacity: "70%" } : {}}
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
            onClick={() => !isHost && answerHandler("four")}
            style={item === "four" ? { opacity: "70%" } : {}}
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
      </div>
    </div>
  );
};

export default QuizFourContent;
