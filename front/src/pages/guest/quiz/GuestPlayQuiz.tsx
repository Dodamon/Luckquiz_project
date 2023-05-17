import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import BalloonGame from "components/game/balloon/BalloonGame";

const GuestPlayQuiz = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const quizItem = useSelector((state: RootState) => state.socket.quizItem);
  const roomId = useSelector((state: RootState) => state.socket.pinNum);
  const nickname = useSelector((state: RootState) => state.guest.nickname);
  const guestResult = useSelector((state: RootState) => state.socket.getGuestResult);
  const end = useSelector((state: RootState) => state.socket.quizEnd);
  const [guestAnswer, SetguestAnswer] = useState("");
  const dispatch = useDispatch();
  // 하나의 퀴즈에서 보여지는 컴포넌트 순서
  // -1: 게임일때 카운트다운 이전에 설명 화면, 0: 카운트다운, 1: 퀴즈/게임 시작, 2: 채점중
  const [order, setOrder] = useState(0);
  console.log("order:", order);

  // 퀴즈 다음문제 새로 가져오면 0부터 다시 진행
  // 게임이면 -1부터 진행
  useEffect(() => {
    quizItem?.quiz ? setOrder(0) : setOrder(-1)
  }, [quizItem]);

  // 해당 문제의 퀴즈 채점결과가 들어오면 결과페이지로 이동
  useEffect(() => {
    console.log("게스트가받는결과:", guestResult);
    console.log(quizItem?.quizNum, guestResult?.quizNum)
    if (quizItem?.quizNum === guestResult?.quizNum) {
      navigate("/guest/quiz/result");
    }
  }, [guestResult]);

  // 이미 호스트가 해당 퀴즈순서를 종료하고 채점으로 넘어갔을 경우, 채점중으로 이동
  useEffect(() => {
  end === "success" && setOrder(2)
  }, [end])

  return (
    quizItem && (
      <div className={styles.container}>
        {order === -1 && <ReadyGame handleOrder={setOrder} />}
        {order === 0 && <CountdownAni handleOrder={setOrder} order={order} />}
        {order === 1 && (
          <>
            <div className={styles.header}>
              {quizItem?.game !== "balloon" && <TimerBar handleOrder={setOrder} />}
              <div className={styles.quizNum}>{/* {quizItem?.quizNum + 1}/{quizItem?.quizSize} */}</div>
            </div>
            <>
              {quizItem?.quiz === "text" && <QuizShortContent handleAnswer={SetguestAnswer} />}
              {quizItem?.quiz === "ox" && <QuizOxContent handleAnswer={SetguestAnswer} />}
              {quizItem?.quiz === "four" && <QuizFourContent handleAnswer={SetguestAnswer} />}
              {quizItem?.game === "wakeup" && <WakeUpGame handleOrder={setOrder} />}
              {quizItem?.game === "balloon" && <BalloonGame handleOrder={setOrder} />}
              {quizItem?.game === "emotion" && <EmotionGame handleOrder={setOrder} />}
            </>
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
      </div>
    )
  );
};

export default GuestPlayQuiz;
