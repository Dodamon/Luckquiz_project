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
  // const [blockMount, setBlockMount] = useState(0); // 최초 마운트시 콜백실행을 막기 위한 변수
  
  // const deleteAndNavigate = () => {
  //   dispatch(socketActions.deleteGuestResult).then(() => {
  //     navigate(`/guest/quiz/play`)
  //   })
  // }
  
  // 새로운 퀴즈가 들어오면 퀴즈페이지로 이동
  useEffect(() => {
    console.log("게스트가 받은 새퀴즈:", quizItem);
    // console.log(blockMount);
    if (quizItem?.quizNum !== result?.quizNum) {
      // deleteAndNavigate() // 다음 퀴즈진행창에서 마운트시 바로 넘어오는것을 막기위해 현재 result 삭제
      navigate('/guest/quiz/play')
      }
    // setBlockMount((prev) => prev + 1); // 최초 실행을 막기 위한 함수
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
