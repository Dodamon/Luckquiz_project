import { Icon } from "@iconify/react";
import { useState } from "react";
import styles from "./QuizOxContent.module.css";
import { getQuizItem, setQuizItem } from "models/quiz";
import QuizGameTitle from "components/common/QuizGameTitle";
import { useSelector } from "react-redux";
import { RootState } from "store";

type QuizOxContentProps = {
  content: getQuizItem;
  handleAnswer? : Function;
};

const QuizOxContent = ({ content, handleAnswer }: QuizOxContentProps) => {
  const [item, setItem] = useState("");
  const guest = useSelector((state: RootState) => state.guest.nickname) !== "" ? true : false; 

  const answerHandler = (answer: string) => {
    setItem(answer);
    console.log(answer)
    handleAnswer && handleAnswer(answer)

  };
  return (
    <div className={styles.QuizOxContent}>
      {/* <div className={styles.content_title}>
                <input type="text" disabled value={"문제입니다"}/>
            </div> */}
      <QuizGameTitle title={content.question} />

      {/* {content.quizUrl &&  */}
      <div className={styles.content_images}>
        <img src={"https://image.hmall.com/static/0/0/32/88/2088320002_1.jpg?RS=600x600&AR=0"} alt="좋아" />
      </div>
      {/* } */}

      <div className={styles.content_answerbox}>
        <div
          className={styles.content_answer}
          onClick={() => guest && answerHandler("O")}
          style={item === "O" ? { opacity: "70%" } : {}}
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
          onClick={() => guest && answerHandler("X")}
          style={item === "X" ? { opacity: "70%" } : {}}
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

export default QuizOxContent;
