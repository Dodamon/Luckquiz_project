import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./Quiz.module.css";
import { Icon } from "@iconify/react";
import profile_sample from "assets/images/profile_sample.png";
import HomeListCard from "components/host/home/HomeListCard";

export interface Quiz {
  id: number;
  title: string;
  date: string;
}

const Quiz = () => {
  // const getMyQuizList = () => {}
  const myQuizList: Quiz[] = [
    {
      id: 0,
      title: "ssafy 스타트 캠프 퀴즈",
      date: "2023년 03월 11일",
    },
    {
      id: 1,
      title: "CS Study 퀴즈",
      date: "2023년 03월 10일",
    },
  ];

  return (

      <div className={`${styles[`content`]}`}>
        <div className={`${styles[`title`]}`}>내가 만든 퀴즈</div>
        <div className={`${styles[`list-col-frame`]}`}>
          {myQuizList.map((quiz, index) => (
            <HomeListCard key={index} menu={0} quiz={quiz}/>
          ))}
          <Link to={"/quiz/create"}>
            <Icon icon="material-symbols:add-circle-outline-rounded" className={`${styles[`add-icon`]}`} />
          </Link>
        </div>
      </div>
  );
};

export default Quiz;
