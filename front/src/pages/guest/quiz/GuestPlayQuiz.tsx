import React, { useState } from "react";
import { setQuizItem } from "models/quiz";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import QuizShortContent from "components/guest/quiz/QuizShortContent";
import QuizOxContent from "components/guest/quiz/QuizOxContent";
import QuizFourContent from "components/guest/quiz/QuizFourContent";
import TimerBar from "components/common/TimerBar";
import CountdownAni from "components/common/CountdownAni";

const GuestPlayQuiz = () => {
  const navigate = useNavigate();
  const { quiz_id } = useParams();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const quizItem = useSelector((state: RootState) => state.socket.quizItem);
  const dispatch = useDispatch();
  // 하나의 퀴즈에서 보여지는 컴포넌트 순서
  // 0: 카운트다운, 1: 퀴즈/게임 시작, 2: 정답 및 랭킹 발표
  const [order, setOrder] = useState(0);

  // const newGameItem: setQuizItem = {

  //     type: "game",
  //     quiz: "",
  //     quizUrl: "",
  //     answer: "",
  //     one: "",
  //     question: "",
  //     two: "",
  //     three: "",
  //     four: "",
  //     answerList: [],
  //     game: "",
  //     timer: 15
  // }

  return (
    <>
      {order === 0 && <CountdownAni handleOrder={setOrder} />}
      {order === 1 && (
        <div>
          <div>
            <TimerBar time={20} handleOrder={setOrder} />
            <div>
              {quizItem?.quizNum}/{quizItem?.quizSize}
            </div>
          </div>
          {quizItem?.quiz === "text" && <QuizShortContent content={quizItem} />}
          {quizItem?.quiz === "ox" && <QuizOxContent content={quizItem} />}
          {quizItem?.quiz === "four" && <QuizFourContent content={quizItem} />}
        </div>
      )}
      {order === 2 && (
        // 랭킹 컴포넌트
        <></>
      )}
    </>
  );
};

export default GuestPlayQuiz;
