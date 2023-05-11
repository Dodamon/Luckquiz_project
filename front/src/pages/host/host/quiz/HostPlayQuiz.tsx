import ButtonWithLogo from "components/common/ButtonWithLogo";
import QuizShortContent from "components/guest/quiz/QuizShortContent";
import { getQuizItem } from "models/quiz";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "store";
import styles from "./HostPlayQuiz.module.css";
import { findByText } from "@testing-library/react";
import QuizOxContent from "components/guest/quiz/QuizOxContent";
import QuizFourContent from "components/guest/quiz/QuizFourContent";

const HostPlayQuiz = () => {
  const navigate = useNavigate();
  const { quiz_id } = useParams();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const quizItem = useSelector((state: RootState) => state.socket.QuizItem);
  const dispatch = useDispatch();

  useEffect(() => {}, [quizItem]);
  console.log(quizItem)
  return (
    <div>
        <>
          {/* <QuizFourContent content={newGameItem}/> */}
          {quizItem?.quiz === "text" && <QuizShortContent content={quizItem} />}
          {quizItem?.quiz === "ox" && <QuizOxContent content={quizItem} />}
          {quizItem?.quiz === "four" && <QuizFourContent content={quizItem} />}
          
          <div className={styles.nextBtn}>
            <ButtonWithLogo name="다음 문제로 넘어가기" fontSize="18px" height="45px"/>
          </div>
        </>
    </div>
  );
};
export default HostPlayQuiz;
