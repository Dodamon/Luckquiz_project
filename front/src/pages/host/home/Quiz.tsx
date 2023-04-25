import { Link, Outlet } from "react-router-dom";
import styles from "./Quiz.module.css";

interface QuizList {
  index: number;
  title: string;
  date: string;
}

// const QuizBox  = (props : QuizList) => {
//   const {title, date} = props
//   return (

//   );
// };

const Quiz = () => {
  // const getMyQuizList = () => {}
  const myQuizList = [
    {
      id: 0,
      title: "ssafy 스타트 캠프 퀴즈",
      date: "2023년 03월 11일",
    },
    {
      index: 1,
      title: "CS Study 퀴즈",
      date: "2023년 03월 10일",
    },
  ];

  return (
    <div className={`${styles[`containter`]}`}>
      <div>레프트</div>
      <div className={`${styles[`list-box`]}`}>
        {myQuizList.map((quiz, index) => (
          <Link key={index} to={`/`} className={`${styles[`quiz-box`]}`}>
              <div className={`${styles[`col`]}`}>
                {quiz.title}
                {quiz.date}
              </div>
              <button></button>
              <button></button>
              <button></button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
