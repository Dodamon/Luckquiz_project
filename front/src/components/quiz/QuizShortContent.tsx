import { Icon } from "@iconify/react";
import { useState } from "react";
import styles from "./QuizShortContent.module.css";
import { getQuizItem } from "models/quiz";
import QuizGameTitle from "components/common/QuizGameTitle";
import { RootState } from "store";
import { useSelector } from "react-redux";

type QuizShortContentProps = {
  handleAnswer?: Function;
};

const QuizShortContent = ({ handleAnswer }: QuizShortContentProps) => {
  const [item, setItem] = useState("");
  const content = useSelector((state: RootState) => state.socket.quizItem!)
  const isHost = useSelector((state: RootState) => state.auth.isAuthenticated);

  const answerHandler = (e: any) => {
    setItem(e.target.value);
    handleAnswer && handleAnswer(e.target.value);
  };
  return (
    <div className={styles.QuizShortContent}>
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
        <div className={styles.content_answer}>
          {" "}
          <div className={styles.content_color} style={{ backgroundColor: "var( --button-two)" }}>
            <div>
              <Icon icon="ic:round-menu" />
            </div>
          </div>
          <div className={styles.content_input}>
            {isHost ? (
              <input type="text" value="주관식" style={{color:"gray"}} disabled/>
            ) : (
              <input type="text" value={item} onChange={(e) => answerHandler(e)} />
            )}
          </div>
        </div>
        {/* <div className={styles.content_submitbox}>
                <div className={styles.content_submit}>
                   
                   <div>제출</div> 
                    </div>
             </div> */}
      </div>
    </div>
  );
};

export default QuizShortContent;
