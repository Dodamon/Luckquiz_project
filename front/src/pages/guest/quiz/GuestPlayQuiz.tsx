import React, { useEffect, useState } from "react";
import { setQuizItem } from "models/quiz";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import QuizShortContent from "components/quiz/QuizShortContent";
import QuizOxContent from "components/quiz/QuizOxContent";
import QuizFourContent from "components/quiz/QuizFourContent";
import TimerBar from "components/common/TimerBar";
import CountdownAni from "components/common/CountdownAni";
import styles from "../../host/host/quiz/HostPlayQuiz.module.css";
import { socketActions } from "store/webSocket";
import ButtonWithLogo from "components/common/ButtonWithLogo";
import StartFinishText from "components/common/StartFinishText";
import WakeUpGame from "components/game/wakeup/WakeUpGame";
import ReadyGame from "components/common/ReadyGame";
import EmotionGame from "components/game/emotion/EmotionGame";
import guest from "store/guest";
import BalloonGame from "components/game/balloon/BalloonGame";

const GuestPlayQuiz = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const quizItem = useSelector((state: RootState) => state.socket.quizItem);
  const roomId = useSelector((state: RootState) => state.socket.pinNum);
  const nickname = useSelector((state: RootState) => state.guest.nickname);
  const end = useSelector((state: RootState) => state.socket.quizEnd)
  const [guestAnswer, SetguestAnswer] = useState("");
  const dispatch = useDispatch();
  // 하나의 퀴즈에서 보여지는 컴포넌트 순서
  // -1: 게임일때 카운트다운 이전에 설명 화면, 0: 카운트다운, 1: 퀴즈/게임 시작, 2: 채점중, 3: 정답 및 랭킹 발표
  const [order, setOrder] = useState(0);

  // 퀴즈 다음문제 새로 가져오면 0부터 다시 진행
  // 게임이면 -1부터 진행
  // 호스트가 퀴즈채점으로 넘기면 (endquiz : end) 2로 전환
  useEffect(() => {
    quizItem ? (quizItem?.quiz ? setOrder(0) : setOrder(-1)) : setOrder(2);
  }, [quizItem]);

  // 이미 호스트가 해당 퀴즈순서를 종료하고 채점으로 넘어갔을 경우 (퀴즈, emotion game)
  // wakeup과 balloon 게임은 별도로 채점 컨트롤이 없이 자체적으로 게스트화면에서 애니메이션을 다 보여주고 화면 전환(handleOrder(2))
  // useEffect(() => {
    // end === "success" && quizItem?.game !== "wakeup" && quizItem?.game !== "balloon" && setOrder(2)
  // }, [end])

  console.log(guestAnswer);

  // const submitAnswer = () => {
  //   console.log("자동제출: ", guestAnswer);
  //   dispatch(
  //     socketActions.sendAnswerMessage({
  //       destination: "/app/submit",
  //       body: { sender: nickname, message: guestAnswer, roomId: roomId, type: "SUBMIT", quizNum: quizItem?.quizNum },
  //     }),
  //   );
  // };

  return (
    quizItem && (
      <div className={styles.container}>
        {order === -1 && <ReadyGame handleOrder={setOrder} />}
        {order === 0 && <CountdownAni handleOrder={setOrder} />}
        {order === 1 && (
          <>
            <div className={styles.header}>
              {quizItem?.game !== "balloon" && <TimerBar handleOrder={setOrder}/>}
            </div>
            <div className={styles.quizContainer}>
              {quizItem?.quiz === "text" && <QuizShortContent handleAnswer={SetguestAnswer} />}
              {quizItem?.quiz === "ox" && <QuizOxContent handleAnswer={SetguestAnswer} />}
              {quizItem?.quiz === "four" && <QuizFourContent handleAnswer={SetguestAnswer} />}
              {quizItem?.game === "wakeup" && <WakeUpGame handleOrder={setOrder} />}
              {quizItem?.game === "balloon" && <BalloonGame handleOrder={setOrder} />}
              {quizItem?.game === "emotion" && <EmotionGame handleOrder={setOrder} />}
            </div>
            {quizItem?.quiz && (
              <div className={styles.nextBtn}>
                <ButtonWithLogo
                  name="제출하기"
                  fontSize="18px"
                  height="45px"
                  onClick={() => {
                    console.log("수동제출");
                    dispatch(
                      socketActions.sendAnswerMessage({
                        destination: "/app/submit",
                        body: {
                          sender: nickname,
                          message: guestAnswer,
                          roomId: roomId,
                          type: "SUBMIT",
                          quizNum: quizItem.quizNum,
                        },
                        // gametype이랑 file은 감정게임에서만
                        // body: {sender:"ryeo",message:"hihi",roomId:123,type:"SUBMIT",quizNum:2,"gameType":"emotion",file:"filedata"},
                      }),
                    );
                    setOrder(2);
                  }}
                />
              </div>
            )}
          </>
        )}
        {order === 2 && <StartFinishText title="채점중인뎁숑" />}
        {order === 3 && (
          // 랭킹 컴포넌트
          <></>
        )}
      </div>
    )
  );
};

export default GuestPlayQuiz;
