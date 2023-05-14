import { useNavigate } from "react-router-dom";
import styles from "./HomeListCard.module.css";
import { Icon } from "@iconify/react";
import main_logo from "assets/images/main_logo.png";
import ready_logo from "assets/images/ready_logo.png";
import save_logo from "assets/images/save_logo.png";
import { Quiz } from "pages/host/home/quiz/Quiz";
import { Report } from "pages/host/home/report/Report";
import useHostAxios from "hooks/useHostAxios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { connectAndSubscribe, socketActions, client } from "store/webSocket";
import { useEffect, useState } from "react";
import axios from "axios";
import { quizAtions } from "store/quiz";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { isConstructorDeclaration } from "typescript";
interface Props {
  quiz: Quiz;
  menu: number;
  report?: string;
  onDeleteQuiz: (quizId: string) => void;
}


const HomeListCard = (props: Props) => {
  const { quiz, menu, report, onDeleteQuiz } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hostName = useSelector((state: RootState) => state.auth.nickname);
  const { data, status, sendHostRequest } = useHostAxios();
  const [open, setOpen] = useState(false);
  const userId = useSelector((state: RootState) => state.auth.userId);


  console.log("서버에서 받은 데이터를 카드로 바로 받은 데이터", quiz.isValid);

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
    
    if (window.confirm(`⭐${title}⭐ 를 지금 바로 진행하시겠습니까?`)) {
      sendHostRequest({
        url: `/api/quizroom/create`,
        method: "POST",
        data: { hostId: userId, templateId: quiz.templateId },
        // templateId 고쳐야됨
      });
    }
  };


  const handleAlertClose = () => {
    setOpen(false);
  };

  const deleteQuizHandler = () => {
    const deleteItem = {
      id: quiz.templateId,
      hostId: userId
    }

    axios.post("https://k8a707.p.ssafy.io/api/quiz/template/delete", deleteItem).then(res => {
      console.log("삭제할때 가는 데이터", res.data);
      onDeleteQuiz(quiz.templateId);
      setOpen(true);
    })
  }



  const dateChangeHandler = (dateValue: string) => {
    const data = dateValue;
    const formattedDate = new Date(data).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
    return formattedDate;
  }


  const test = () => {
    axios.get(`https://k8a707.p.ssafy.io/api/quiz/template/info?templateId=${quiz.templateId}&hostId=${userId}`).then(res => {
      console.log(res.data);

    })
  }





  return (
    <div className={styles.quizBox}>
      <div className={styles.quizRowFrame}>
        <div className={styles.logoImgContainer}>
          {
            (!quiz.isValid || quiz.isValid.toString() === "false") ? <img className={styles.logoImg} src={save_logo} alt="준비미완료" /> :
              <img className={styles.logoImg} src={ready_logo} alt="준비완료" />
          }

        </div>
        <div>
          {/* quiz에서 쓰이는 경우 (menu = 0)*/}
          {menu === 0 ? (
            <>
              <div className={styles.quizTitle}>{quiz?.name}</div>
              <div className={styles.placeholder}>{dateChangeHandler(quiz?.date)}</div>
            </>
          ) : (
            <>
              {/* <div className={styles.quizTitle}>{report?.title}</div> */}
              {/* <div className={styles.placeholder}>{report?.date}</div> */}
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

                  dispatch(quizAtions.templateIdUpdate(quiz.templateId))
                  navigate(`/quiz/${quiz.templateId}/edit`);
                }}
              />
            </button>
            {
              (!quiz.isValid || quiz.isValid.toString() === "false") ? <></> : <button className={styles.button} >
                <Icon
                  icon="iconoir:play-outline"
                  className={styles.btn}
                  style={{ backgroundColor: "var(--select-four)" }}
                  onClick={() => {
                    startQuiz(quiz.name);
                  }}
                />
              </button>

            }

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
          <div className={styles.parti}>참여자 </div>
          // {report?.participants}명
        )}
      </div>

      <Dialog open={open} onClose={handleAlertClose}>
        <DialogTitle>알림</DialogTitle>
        <DialogContent>
          <DialogContentText>템플릿이 삭제되었습니다.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleAlertClose()}>닫기</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HomeListCard;
