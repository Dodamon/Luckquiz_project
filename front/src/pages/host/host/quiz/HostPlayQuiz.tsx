import ButtonWithLogo from "components/common/ButtonWithLogo";
import QuizShortContent from "components/guest/quiz/QuizShortContent";
import { getQuizItem } from "models/quiz";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "store";
import styles from "./HostPlayQuiz.module.css";
import { findByText } from "@testing-library/react";
import QuizOxContent from "components/guest/quiz/QuizOxContent";
import QuizFourContent from "components/guest/quiz/QuizFourContent";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import TimerBar from "components/common/TimerBar";
import CountdownAni from "components/common/CoutdownAni";

const HostPlayQuiz = () => {
  const navigate = useNavigate();
  const { quiz_id } = useParams();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const quizItem = useSelector((state: RootState) => state.socket.quizItem);
  const dispatch = useDispatch();
  const [showQuizGame, setShowQuizGame] = useState(false);
  // 하나의 퀴즈에서 보여지는 컴포넌트 순서
  // 0: 카운트다운, 1: 퀴즈/게임 시작, 2: 정답 및 랭킹 발표
  const [order, setOrder] = useState(0);
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

  // useEffect(() => {
  //   order === 0 && (
  //     setTimeout
  //   )
  // })
  
  

  useEffect(() => {}, [quizItem]);
  console.log(quizItem);
  return (
    <div>
      <>
        {order === 0 && (
          <CountdownAni handleOrder={setOrder}/>
        )}
        {order === 1 && (
          <>
            <div>
              <TimerBar time={20} />
              <div>
                {quizItem?.quizNum}/{quizItem?.quizSize}
              </div>
            </div>
            {quizItem?.quiz === "text" && <QuizShortContent content={quizItem} />}
            {quizItem?.quiz === "ox" && <QuizOxContent content={quizItem} />}
            {quizItem?.quiz === "four" && <QuizFourContent content={quizItem} />}
            {/* 
          <div className={styles.submitChart}>
            <Doughnut data={chartConfig} />
          </div> */}
            <div className={styles.nextBtn}>
              <ButtonWithLogo name="건너뛰기" fontSize="18px" height="45px" />
            </div>
          </>
        )}
      </>
    </div>
  );
};
export default HostPlayQuiz;
