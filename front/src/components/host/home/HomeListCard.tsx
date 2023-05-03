import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./HomeListCard.module.css";
import { Icon } from "@iconify/react";
import main_logo from "assets/images/main_logo.png";
import { Quiz } from "pages/host/home/quiz/Quiz";
import { Report } from "pages/host/home/report/Report";

interface Props {
  menu: number;
  quiz?: Quiz;
  report?: Report;
}

const HomeListCard = (props: Props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.quizBox}>
      <div className={styles.quizRowFrame}>
        <div className={styles.logoImgContainer}>
          <img className={styles.logoImg} src={main_logo} alt="" />
        </div>
        <div>
          {/* quiz에서 쓰이는 경우 (menu = 0)*/}
          {props.menu === 0 ? (
            <>
              <div className={styles.quizTitle}>{props.quiz?.title}</div>
              <div className={styles.placeholder}>{props.quiz?.date}</div>
            </>
          ) : (
            <>
              <div className={styles.quizTitle}>{props.report?.title}</div>
              <div className={styles.placeholder}>{props.report?.date}</div>
            </>
          )}
        </div>
      </div>

      <div className={styles.quizRowFrame}>
        {/* quiz에서 쓰이는 경우 (menu = 0)*/}
        {props.menu === 0 ? (
          <>
            <button className={styles.button}>
              <Icon
                icon="iconoir:edit-pencil"
                className={styles.btn}
                style={{ backgroundColor: "var(--button-two)" }}
                onClick={() => {
                  navigate(`/quiz/${props.quiz?.id}/edit`);
                }}
              />
            </button>
            <button className={styles.button}>
              <Icon
                icon="iconoir:play-outline"
                className={styles.btn}
                style={{ backgroundColor: "var(--select-four)" }}
                onClick={() => {}}
              />
            </button>
            <button className={styles.button}>
              <Icon
                icon="ic:outline-cancel"
                className={styles.btn}
                style={{ backgroundColor: "var(--button-delete)" }}
                onClick={() => {}}
              />
            </button>
          </>
        ) : (
          // report에서 쓰이는 경우 (menu = 1)
          <div className={styles.parti}>참여자 {props.report?.participants}명</div>
        )}
      </div>
    </div>
  );
};

export default HomeListCard;
