import { Icon } from "@iconify/react";
import { useState } from "react";
import logo from "../../../assets/images/timer1.png";
import styles from "./QuizFourContent.module.css";
import { getQuizItem, setQuizItem } from "models/quiz";
import QuizGameTitle from "components/common/QuizGameTitle";
import { useSelector } from "react-redux";
import { RootState } from "store";

type QuizFourContentProps = {
  content: getQuizItem;
};

// const content = {
//   answer: "의경",
//   answerList: null,
//   four: "의경",
//   game: null,
//   id: 1315,
//   one: "육군",
//   question: "알톡챗의 병과는?",
//   quiz: "four",
//   quizNum: 1,
//   quizSize: 4,
//   quizUrl: "https://storage.googleapis.com/luckquiz/08b9d217-ecf4-48e1-8195-275c8b71a003",
//   three: "공군",
//   timer: 10,
//   two: "해군",
//   type: null,
// };

const QuizFourContent = ({ content }: QuizFourContentProps) => {
  const [item, setItem] = useState("");
  const auth = useSelector((state: RootState) => state.auth.isAuthenticated);

  const answerHandler = (answer: string) => {
    setItem(answer);
  };
  return (
    <div className={styles.QuizFourContent}>
      {/* <div className={styles.content_title}>
                <input type="text" value={content.game} />
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
          onClick={() => !auth && answerHandler("one")}
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
          onClick={() => !auth && answerHandler("two")}
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
          onClick={() => !auth && answerHandler("three")}
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
          onClick={() => !auth && answerHandler("four")}
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
  );
};

export default QuizFourContent;
