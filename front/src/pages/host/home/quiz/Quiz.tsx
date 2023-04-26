import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./Quiz.module.css";
import { Icon } from "@iconify/react";
import main_logo from "assets/images/main_logo.png";
import profile_sample from "assets/images/profile_sample.png";

// interface QuizList {
//   id: number;
//   title: string;
//   date: string;
// }

const Quiz = () => {
  const navigate = useNavigate();
  // const getMyQuizList = () => {}
  const myQuizList = [
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
    <div className={`${styles[`container`]}`}>
      {/* <div className={`${styles[`container1`]}`}> */}
      <div className={`${styles[`side`]}`}>
        <div className={`${styles[`side-tab-box`]}`}>
          <div className={`${styles[`profile`]}`}>
            <img className={`${styles[`profile-img`]}`} src={profile_sample} alt="" />
            무지개꽃잎이
          </div>
          <Link to={"/home"}>
            <div className={`${styles[`menu`]}`} style={{ backgroundColor: "var(--side-bar)" }}>
              <Icon icon="mdi:view-list-outline" />
              퀴즈
            </div>
          </Link>
          <Link to={"/home/report"}>
            <div className={`${styles[`menu`]}`}>
              <Icon icon="mdi:poll" />
              레포트
            </div>
          </Link>
        </div>
      </div>
      {/* </div> */}
      <div className={`${styles[`content`]}`}>
        <div className={`${styles[`title`]}`}>내가 만든 퀴즈</div>
        <div className={`${styles[`list-col-frame`]}`}>
          {myQuizList.map((quiz, index) => (
            <div className={`${styles[`quiz-box`]}`}>
              <div className={`${styles[`quiz-row-frame`]}`}>
                <div className={`${styles[`logo-img-container`]}`}>
                  <img className={`${styles[`logo-img`]}`} src={main_logo} alt="" />
                </div>
                <div>
                  <div className={`${styles[`quiz-title`]}`}>{quiz.title}</div>
                  <div className={`${styles[`placeholder`]}`}>{quiz.date}</div>
                </div>
              </div>
              <div className={`${styles[`quiz-row-frame`]}`}>
                <button className={`${styles[`button`]}`}>
                  <Icon
                    icon="iconoir:edit-pencil"
                    className={`${styles[`btn`]}`}
                    style={{ backgroundColor: "var(--button-two)" }}
                    onClick={() => {
                      navigate(`/quiz/${quiz.id}/edit`);
                    }}
                  />
                </button>
                <button className={`${styles[`button`]}`}>
                  <Icon
                    icon="iconoir:play-outline"
                    className={`${styles[`btn`]}`}
                    style={{ backgroundColor: "var(--select-four)" }}
                    onClick={() => {}}
                  />
                </button>
                <button className={`${styles[`button`]}`}>
                  <Icon
                    icon="ic:outline-cancel"
                    className={`${styles[`btn`]}`}
                    style={{ backgroundColor: "var(--button-delete)" }}
                    onClick={() => {}}
                  />
                </button>
              </div>
            </div>
          ))}
          <Link to={"/quiz/create"}>
            <Icon icon="material-symbols:add-circle-outline-rounded" className={`${styles[`add-icon`]}`} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
