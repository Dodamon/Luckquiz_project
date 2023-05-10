import React from "react";
import { setQuizItem } from "models/quiz";
import QuizShortContent from "../../../components/guest/quiz/QuizShortContent";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";

const GuestPlayQuiz = () => {
  const navigate = useNavigate();
  const { quiz_id } = useParams();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const quizItem = useSelector((state: RootState) => state.socket.QuizItem);
  const dispatch = useDispatch();
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
    quizItem && (
      <>
        {/* <QuizFourContent content={newGameItem}/> */}
        <QuizShortContent content={quizItem} />
      </>
    )
  );
};

export default GuestPlayQuiz;
