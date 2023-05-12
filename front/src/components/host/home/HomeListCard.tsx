import { useNavigate } from "react-router-dom";
import styles from "./HomeListCard.module.css";
import { Icon } from "@iconify/react";
import main_logo from "assets/images/main_logo.png";
import { Quiz } from "pages/host/home/quiz/Quiz";
import { Report } from "pages/host/home/report/Report";
import useHostAxios from "hooks/useHostAxios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { connectAndSubscribe, socketActions } from "store/webSocket";
import { client } from "store/webSocket";
import { useEffect } from "react";

interface Props {
  menu: number;
  quiz?: Quiz;
  report?: Report;
}

const HomeListCard = (props: Props) => {
  const { menu, quiz, report } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hostName = useSelector((state: RootState) => state.auth.nickname);
  const { data, status, sendHostRequest } = useHostAxios();

  useEffect(() => {
    if (data) {
      // 정상 connectedAndSubscribe시, 퀴즈방으로 이동
      const socketProps = {
        roomNum: data!.roomId,
        name: hostName,
        img: 0,
        isHost: true,
      };
      connectAndSubscribe(socketProps, dispatch);
      navigate(`/host/quiz/${data?.roomId}`);
    }
  }, [data]);

  // 퀴즈시작 버튼 클릭시, pin번호 받아오기
  const startQuiz = (title : string) => {
    if (window.confirm(`⭐${title}⭐ 를 지금 바로 진행하시겠습니까?`)) {
      sendHostRequest({
        url: `/api/quizroom/create`,
        method: "POST",
        data: { hostId: "7fb5bc30-c7c6-4cd9-859d-2bb4ef982644", templateId: 1 },
        // templateId 고쳐야됨
      });
    }
  };

  return (
    <div className={styles.quizBox}>
      <div className={styles.quizRowFrame}>
        <div className={styles.logoImgContainer}>
          <img className={styles.logoImg} src={main_logo} alt="" />
        </div>
        <div>
          {/* quiz에서 쓰이는 경우 (menu = 0)*/}
          {menu === 0 ? (
            <>
              <div className={styles.quizTitle}>{quiz?.title}</div>
              <div className={styles.placeholder}>{quiz?.date}</div>
            </>
          ) : (
            <>
              <div className={styles.quizTitle}>{report?.title}</div>
              <div className={styles.placeholder}>{report?.date}</div>
            </>
          )}
        </div>
      </div>

      <div className={styles.quizRowFrame}>
        {/* quiz에서 쓰이는 경우 (menu = 0)*/}
        {menu === 0 ? (
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
                onClick={() => {
                  props.quiz?.title && startQuiz(props.quiz?.title);
                }}
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
          <div className={styles.parti}>참여자 {report?.participants}명</div>
        )}
      </div>
    </div>
  );
};

export default HomeListCard;
