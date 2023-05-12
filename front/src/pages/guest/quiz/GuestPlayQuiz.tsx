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
import { socketActions } from "store/webSocket";
import ButtonWithLogo from "components/common/ButtonWithLogo";

const GuestPlayQuiz = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const quizItem = useSelector((state: RootState) => state.socket.quizItem);
  const roomId = useSelector((state : RootState) => state.socket.pinNum)
  const nickname = useSelector((state : RootState) => state.guest.nickname)
  const [guestAnswer, SetguestAnswer] = useState("")
  const dispatch = useDispatch();
  // 하나의 퀴즈에서 보여지는 컴포넌트 순서
  // 0: 카운트다운, 1: 퀴즈/게임 시작, 2: 정답 및 랭킹 발표
  const [order, setOrder] = useState(0);

  // 퀴즈 다음문제 새로 가져오면 0부터 다시 진행
  useEffect(() => {
    setOrder(0);
  }, [quizItem]);

  const submitAnswer = () => {
    dispatch(
      socketActions.sendAnswerMessage({
        destination: "/app/submit",
        body: {sender:nickname, message:guestAnswer,roomId:roomId,type:"SUBMIT",quizNum:quizItem?.quizNum},
        // gametype이랑 file은 감정게임에서만
        // body: {sender:"ryeo",message:"hihi",roomId:123,type:"SUBMIT",quizNum:2,"gameType":"emotion",file:"filedata"},
      }),
    )
  }

  return (
    quizItem && (
      <div className={styles.container}>
        {order === 0 && <CountdownAni handleOrder={setOrder} />}
        {order === 1 && (
          <>
            <div className={styles.header}>
              <TimerBar time={quizItem.timer} handleOrder={setOrder} handleSubmit={submitAnswer} />
            </div>
            <div className={styles.quizContainer}>
              {quizItem?.quiz === "text" && <QuizShortContent content={quizItem} handleAnswer={SetguestAnswer} />}
              {quizItem?.quiz === "ox" && <QuizOxContent content={quizItem}  handleAnswer={SetguestAnswer} />}
              {quizItem?.quiz === "four" && <QuizFourContent content={quizItem}  handleAnswer={SetguestAnswer} />}
            </div>
            <div className={styles.nextBtn}>
              <ButtonWithLogo
                name="제출하기"
                fontSize="18px"
                height="45px"
                onClick={() =>
                  dispatch(
                    socketActions.sendAnswerMessage({
                      destination: "/app/submit",
                      body: {sender:nickname, message:guestAnswer,roomId:roomId,type:"SUBMIT",quizNum:quizItem.quizNum},
                      // gametype이랑 file은 감정게임에서만
                      // body: {sender:"ryeo",message:"hihi",roomId:123,type:"SUBMIT",quizNum:2,"gameType":"emotion",file:"filedata"},
                    }),
                  )
                }
              />
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
