import { useNavigate } from "react-router-dom";
import styles from "./HomeListCard.module.css";
import { Icon } from "@iconify/react";
import reports_logo from "assets/images/reports_logo.png";
import ready_logo from "assets/images/ready_logo.png";
import save_logo from "assets/images/save_logo.png";
import { Quiz } from "pages/host/home/quiz/Quiz";
import { Report } from "pages/host/home/report/Report";
import useHostAxios from "hooks/useHostAxios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { connectAndSubscribe } from "store/webSocket";
import { useEffect } from "react";
import axios from "axios";
import { quizAtions } from "store/quiz";
import { toast } from "react-toastify";
import { QuizStartConfirm, TemplateDeleteConfirm } from "components/common/ConfirmCustom";

interface Props {
  quiz?: Quiz;
  menu: number;
  report?: Report;
  onDeleteQuiz?: (quizId: string) => void;
  setUpdateChk?: React.Dispatch<React.SetStateAction<boolean>>;
  updataChk?: boolean;
}

const HomeListCard = (props: Props) => {
  const { quiz, menu, report, onDeleteQuiz, setUpdateChk, updataChk } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hostName = useSelector((state: RootState) => state.auth.name);
  const { data, sendHostRequest } = useHostAxios();
  const { data: getCommentData, sendHostRequest: getCommentRequest } = useHostAxios();
  const userId = useSelector((state: RootState) => state.auth.userId);

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
  const startQuiz = (title: string) => {
    if (quiz) {
      toast.info(
        () => (
          <QuizStartConfirm
            message={`⭐${title}⭐ 를 지금 바로 진행하시겠습니까?`}
            onConfirm={() => {
              sendHostRequest({
                url: `/api/quizroom/create`,
                method: "POST",
                data: { hostId: userId, templateId: quiz.templateId },
              });
            }}
            onCancel={() => {}}
          />
        ),
        {
          position: "top-center",
          autoClose: false,
        },
      );
    }
  };
  const deleteQuizHandler = () => {
    if (quiz) {
      const deleteItem = {
        id: quiz.templateId,
        hostId: userId,
      };
      toast.error(
        () => (
          <TemplateDeleteConfirm
            message={`정말로 삭제하시겠습니까?`}
            onConfirm={() => {
              axios.post(`${process.env.REACT_APP_HOST}/api/quiz/template/delete`, deleteItem).then((res) => {
                if (onDeleteQuiz) {
                  onDeleteQuiz(quiz.templateId);
                }
              });
            }}
            onCancel={() => {}}
          />
        ),
        {
          position: "top-center",
          autoClose: false,
        },
      );
    }
  };

  const dateChangeHandler = (dateValue: string) => {
    const data = dateValue;
    const formattedDate = new Date(data).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  };

  const navigateHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (report) {
      navigate(`/home/report/${report.reportId}/basicinfo`);
    }
  };

  // const deleteReportHandler = (event: React.MouseEvent) => {
  //   event.stopPropagation();
  //   getCommentRequest({
  //     url: `/api/quiz/report/delete`,
  //     method: "POST",
  //     data: { reportId: report?.reportId },
  //   });

  //   setUpdateChk && setUpdateChk(!updataChk);
  //   alert("레포트가 삭제 되었습니다.");
  // };

  const deleteReportHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    toast.error(
      () => (
        <TemplateDeleteConfirm
          message={`정말로 삭제하시겠습니까?`}
          onConfirm={() => {
            getCommentRequest({
              url: `/api/quiz/report/delete`,
              method: "POST",
              data: { reportId: report?.reportId },
            }).then(() => {
              setUpdateChk && setUpdateChk(!updataChk);
            });
          }}
          onCancel={() => {}}
        />
      ),
      {
        position: "top-center",
        autoClose: false,
      },
    );
  };

  return (
    <div className={styles.quizBox} style={report && { cursor: "pointer" }} onClick={navigateHandler}>
      <div className={styles.quizRowFrame}>
        <div className={styles.logoImgContainer}>
          {!quiz ? (
            <img className={styles.logoImg} src={reports_logo} alt="준비미완료" />
          ) : !quiz.isValid || quiz.isValid.toString() === "false" ? (
            <img className={styles.logoImg} src={save_logo} alt="준비미완료" />
          ) : (
            <img className={styles.logoImg} src={ready_logo} alt="준비완료" />
          )}
        </div>
        <div>
          {/* quiz에서 쓰이는 경우 (menu = 0)*/}
          {menu === 0 && quiz ? (
            <>
              <div className={styles.quizTitle}>{quiz?.name}</div>
              <div className={styles.placeholder}>{dateChangeHandler(quiz.date)}에 저장됨</div>
            </>
          ) : (
            report && (
              <>
                <div className={styles.quizTitle}>{report?.title}</div>
                <div className={styles.placeholder}>{dateChangeHandler(report?.createdTime)} 기록</div>
              </>
            )
          )}
        </div>
      </div>

      <div className={styles.quizRowFrame}>
        {/* quiz에서 쓰이는 경우 (menu = 0)*/}
        {menu === 0 && quiz ? (
          <>
            <button className={styles.button}>
              <Icon
                icon="iconoir:edit-pencil"
                className={styles.btn}
                style={{ backgroundColor: "var(--button-two)" }}
                onClick={() => {
                  dispatch(quizAtions.templateIdUpdate(quiz.templateId));
                  navigate(`/quiz/${quiz.templateId}/edit`);
                }}
              />
            </button>
            {!quiz.isValid || quiz.isValid.toString() === "false" ? (
              <></>
            ) : (
              <button className={styles.button}>
                <Icon
                  icon="iconoir:play-outline"
                  className={styles.btn}
                  style={{ backgroundColor: "var(--select-four)" }}
                  onClick={() => {
                    startQuiz(quiz.name);
                  }}
                />
              </button>
            )}

            <button className={styles.button}>
              <Icon
                icon="ic:outline-cancel"
                className={styles.btn}
                style={{ backgroundColor: "var(--button-delete)" }}
                onClick={() => {
                  deleteQuizHandler();
                }}
              />
            </button>
          </>
        ) : (
          // report에서 쓰이는 경우 (menu = 1)
          <>
            <div className={styles.parti_box}>
              <div className={styles.parti}>참여 {report?.participantCount} 명 </div>
              <div className={styles.parti_trash} onClick={deleteReportHandler}>
                <Icon icon="material-symbols:delete-forever-rounded" color="red" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeListCard;
