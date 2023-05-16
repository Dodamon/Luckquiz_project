import QuizRanking from "components/quiz/QuizRanking";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "store";
import { socketActions } from "store/webSocket";

const GuestResult = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quizItem = useSelector((state: RootState) => state.socket.quizItem);
  const result = useSelector((state: RootState) => state.socket.getGuestResult)
  const finalResult = useSelector((state: RootState) => state.socket.getFinalResultList)
  
  // 새로운 퀴즈가 들어오면 퀴즈페이지로 이동
  useEffect(() => {
    console.log("게스트가 받은 새퀴즈:", quizItem);
    if (quizItem?.quizNum !== result?.quizNum) {
      navigate('/guest/quiz/play')
      }
  }, [quizItem]);

  // 최종결과가 들어오면 어워즈페이지로 이동
  useEffect(() => {
    navigate('/guest/quiz/result')
  }, [finalResult])

  return (
    <>
      <QuizRanking />
    </>
  );
};
export default GuestResult;
