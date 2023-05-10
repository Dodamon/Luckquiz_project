import ButtonWithLogo from "components/common/ButtonWithLogo";
import QuizShortContent from "components/guest/quiz/QuizShortContent";
import { getQuizItem } from "models/quiz";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "store";

const quizType = {
  
}

const HostPlayQuiz = () => {
  const navigate = useNavigate();
  const { quiz_id } = useParams();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const quizItem = useSelector((state: RootState) => state.socket.QuizItem);
  const dispatch = useDispatch();

  useEffect(() => {}, [quizItem]);

  return (
    quizItem && (
      <>
        {/* <QuizFourContent content={newGameItem}/> */}
        <QuizShortContent content={quizItem} />
        <ButtonWithLogo name="다음" />
        {/* {quizItem?.quizSize - quizItem?.quizNum === 1 ? (
          <ButtonWithLogo name="퀴즈 진행 종료" />
        ) : (
          <ButtonWithLogo name="다음" />
        )} */}
      </>
    )
  );
};
export default HostPlayQuiz;
