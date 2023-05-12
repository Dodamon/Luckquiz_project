import React, { useEffect, useState } from "react";
import { setQuizItem } from "models/quiz";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import QuizShortContent from "components/guest/quiz/QuizShortContent";
import QuizOxContent from "components/guest/quiz/QuizOxContent";
import QuizFourContent from "components/guest/quiz/QuizFourContent";
import TimerBar from "components/common/TimerBar";
import CountdownAni from "components/common/CountdownAni";
import styles from "../../host/host/quiz/HostPlayQuiz.module.css";

const GuestPlayQuiz = () => {
  const navigate = useNavigate();
  const { quiz_id } = useParams();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const quizItem = useSelector((state: RootState) => state.socket.quizItem);
  const dispatch = useDispatch();
  // 하나의 퀴즈에서 보여지는 컴포넌트 순서
  // 0: 카운트다운, 1: 퀴즈/게임 시작, 2: 정답 및 랭킹 발표
  const [order, setOrder] = useState(0);

  // 퀴즈 다음문제 새로 가져오면 0부터 다시 진행
  useEffect(() => {
    setOrder(0);
  }, [quizItem]);

  return (
    quizItem && (
      <div className={styles.container}>
        {order === 0 && <CountdownAni handleOrder={setOrder} />}
        {order === 1 && (
          <>
            <div className={styles.header}>
              <TimerBar time={quizItem.timer} handleOrder={setOrder} />
              {quizItem?.quizNum}/{quizItem?.quizSize}
            </div>
            <div className={styles.quizContainer}>
              {quizItem?.quiz === "text" && <QuizShortContent content={quizItem} />}
              {quizItem?.quiz === "ox" && <QuizOxContent content={quizItem} />}
              {quizItem?.quiz === "four" && <QuizFourContent content={quizItem} />}
            </div>
          </>
        )}
        {order === 2 && (
          // 랭킹 컴포넌트
          <></>
        )}
      </div>
    )
  );
};

export default GuestPlayQuiz;
