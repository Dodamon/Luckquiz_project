import ButtonWithLogo from "components/common/ButtonWithLogo";
import QuizShortContent from "components/quiz/QuizShortContent";
import { getQuizItem } from "models/quiz";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "store";
import styles from "./HostPlayQuiz.module.css";
import { findByText } from "@testing-library/react";
import QuizOxContent from "components/quiz/QuizOxContent";
import QuizFourContent from "components/quiz/QuizFourContent";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import TimerBar from "components/common/TimerBar";
import CountdownAni from "components/common/CountdownAni";
import SubmitChart from "components/host/quiz/SubmitChart";
import { socketActions } from "store/webSocket";
import StartFinishText from "components/common/StartFinishText";

const HostPlayQuiz = () => {
  const navigate = useNavigate();
  const { quiz_id } = useParams();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const quizItem = useSelector((state: RootState) => state.socket.quizItem);
  const dispatch = useDispatch();
  const [showQuizGame, setShowQuizGame] = useState(false);
  // 하나의 퀴즈에서 보여지는 컴포넌트 순서
  // 0: 카운트다운, 1: 퀴즈/게임 시작, 2: 채점중, 3: 정답 및 랭킹 발표
  const [order, setOrder] = useState(0);
  console.log("order:", order);
  // const [data, Setdata] = useState()

  // const chartConfig = {
  //   labels: [],
  //   datasets: [
  //     {
  //       data: [42, 58], // 정답율, 오답율
  //       backgroundColor: ["#1bd392", "#f75555"],
  //       borderRadius: 30,
  //       borderColor: "#ffff",
  //       borderWidth: 2.5,
  //       cutout: "60%",
  //       // shadowOffsetX: 30,
  //       // shadowOffsetY: 30,
  //       // shadowBlur: 10,
  //       // shadowColor: "#a3c8ff",
  //     },
  //   ],
  //   options: {
  //     tooltips: {
  //       endabled: false,
  //     },
  //   },
  // };

  // 퀴즈 다음문제 새로 가져오면 0부터 다시 진행
  useEffect(() => {
    setOrder(0);
  }, [quizItem]);

  // 호스트 기준 퀴즈시간이 끝나면 quizgameend publish
  const quizGameEnd = () => {
    console.log('자동채점')
    dispatch(
      socketActions.sendAnswerMessage({
        destination: "/app/turnEnd", // 퀴즈 끝났다는 end publish 출제자가 직접 컨트롤 or 시간 다 가면 자동으로 전송
        body: { hostId: userId, roomId: quiz_id },
      }),
    );
  };

  console.log(quizItem);
  return (
    quizItem && (
      <div className={styles.container}>
        {order === 0 && <CountdownAni handleOrder={setOrder} />}
        {order === 1 && (
          <>
            <div className={styles.header}>
              {/* <TimerBar time={quizItem.timer} handleOrder={setOrder} handleSubmit={quizGameEnd}/> */}
              <TimerBar time={quizItem.timer} handleOrder={setOrder} handleSubmit={quizGameEnd}/>
              {quizItem?.quizNum + 1}/{quizItem?.quizSize}
            </div>
            <div className={styles.quizContainer}>
              {quizItem?.quiz === "text" && <QuizShortContent content={quizItem} />}
              {quizItem?.quiz === "ox" && <QuizOxContent content={quizItem} />}
              {quizItem?.quiz === "four" && <QuizFourContent content={quizItem} />}
            </div>
            {/* 
            <div className={styles.currenSubmitChart}>
              <Doughnut data={chartConfig} />
            </div> */}
            <div className={styles.nextBtn}>
              <ButtonWithLogo
                name="건너뛰기"
                fontSize="18px"
                height="45px"
                onClick={() =>
                  dispatch(
                    socketActions.sendAnswerMessage({
                      destination: "/app/quiz/rollback",
                      body: { hostId: userId, roomId: quiz_id },
                    }),
                  )
                }
              />
              <ButtonWithLogo
                name="채점하기"
                fontSize="18px"
                height="45px"
                onClick={() => {
                  console.log('수동채점')
                  dispatch(
                    socketActions.sendAnswerMessage({
                      destination: "/app/turnEnd", // 퀴즈 끝났다는 end publish 출제자가 직접 컨트롤 or 시간 다 가면 자동으로 전송
                      body: { hostId: userId, roomId: quiz_id },
                    }),
                  );
                  setOrder(2);
                }}
              />
            </div>
          </>
        )}
        {order === 2 && (
          <>
            <StartFinishText title="채점중인뎁숑" />

            {/* 임시로 달아놈 */}
            <div className={styles.nextBtn}>
              <ButtonWithLogo
                name="다음 퀴즈(임시)"
                fontSize="18px"
                height="45px"
                onClick={() =>
                  dispatch(
                    socketActions.sendAnswerMessage({
                      destination: "/app/quiz/next",
                      body: { hostId: userId, roomId: quiz_id },
                    }),
                  )
                }
              />
            </div>
          </>
        )}
        {order === 3 && (
          // 랭킹 컴포넌트
          <>
            <div className={styles.submitChart}>
              <SubmitChart myData={[34, 24]} />
            </div>
            {/* 마지막 문제인지 아닌지 */}
            {quizItem.quizSize - quizItem.quizNum === 1 ? (
              <div className={styles.nextBtn}>
                <ButtonWithLogo
                  name="최종 결과보기"
                  fontSize="18px"
                  height="45px"
                  // onClick={() => {
                  //   dispatch(
                  //     socketActions.sendAnswerMessage({
                  //       destination: "/app/quiz/next",
                  //       body: { sender: "fufu", img: 2, roomId: "3670055" },
                  //     }),
                  //   );
                  // }}
                />
              </div>
            ) : (
              <div className={styles.nextBtn}>
                <ButtonWithLogo
                  name="다음 퀴즈"
                  fontSize="18px"
                  height="45px"
                  onClick={() =>
                    dispatch(
                      socketActions.sendAnswerMessage({
                        destination: "/app/quiz/next",
                        body: { hostId: userId, roomId: quiz_id },
                      }),
                    )
                  }
                />
              </div>
            )}
          </>
        )}
      </div>
    )
  );
};
export default HostPlayQuiz;
