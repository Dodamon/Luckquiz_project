import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./HomeListCard.module.css";
import { Icon } from "@iconify/react";
import main_logo from "assets/images/main_logo.png";
import { Quiz } from "pages/host/home/quiz/Quiz";
import { Report } from "pages/host/home/report/Report";
import useHostAxios from "hooks/useHostAxios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { socketActions } from "store/webSocket";
import { WebSocketConnection } from "utils/socket";
import { Client, Stomp } from "@stomp/stompjs";
// import { client } from "utils/socket";

interface Props {
  menu: number;
  quiz?: Quiz;
  report?: Report;
}

const HomeListCard = (props: Props) => {
  const { menu, quiz, report } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hostInfo = useSelector((state: RootState) => state.auth);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const clientState = useSelector((state: RootState) => state.socket.client);
  const { data, status, sendHostRequest } = useHostAxios();

  // const WebSocketConnection = (props: { roomId: Number }) => {
  //   const { roomId } = props;
  //   const client = new Client({
  //     brokerURL: "ws://k8a707.p.ssafy.io/connect/quiz",

  //     // connect시, 구독 시도 -> redux client 갱신
  //     onConnect: () => {
  //       console.log("Connected to WebSocket");
  //       // const sender = {
  //       //   sender: hostInfo.nickname,
  //       //   img: hostInfo.image_url,
  //       //   type: "ENTER",
  //       // };
  //       // const callback = function (res: any) {
  //       //   if (res.body) console.log(`도착 message: ${res.body}`);
  //       //   else console.log("got empty message");
  //       //   // dispatch(socketActions.setSocketClient(client));
  //       // };

  //       // const subscribeURL = `/topic/quiz/${roomId}`;
  //       // const senderObj = JSON.stringify(sender);
  //       // if (clientState?.connected) {
  //       // console.log("subscribe");
  //       // client.subscribe(subscribeURL, callback, { ...sender });
  //       dispatch(socketActions.setSocketClient(client));
  //       // }
  //     },
  //     onStompError: (frame) => {
  //       console.log("Broker reported error: " + frame.headers["message"]);
  //       console.log("Additional details: " + frame.body);
  //       dispatch(socketActions.setSocketClient(client));
  //     },
  //     onWebSocketClose: () => {
  //       console.log("WebSocket closed");
  //     },
  //   });
  //   client.activate();
  // };

  // 퀴즈시작 버튼 클릭시, pin번호 받아오기
  const startQuiz = () => {
    // sendHostRequest({ url: `/api/quizroom/room`, method: "POST", data: { hostId: userId, templateId: quiz?.id } });
    console.log("start?");
    sendHostRequest({
      url: `/api/quizroom/create`,
      method: "POST",
      data: { hostId: "7fb5bc30-c7c6-4cd9-859d-2bb4ef982644", templateId: 7 },
    });
  };

  // pin번호를 받아오면, socket connect 시도
  useEffect(() => {
    if (data) {
      console.log("goPin");
      console.log(data);
      WebSocketConnection({ dispatch });
      // if (window.confirm("퀴즈를 진행하시겠습니까?")) {
      //   if (data && client.connected) {
      //     navigate(`/host/quiz/${data?.roomId}`);
      //   }
    }
  }, [data]);

  // 정상 connected시, 퀴즈방으로 이동
  useEffect(() => {
    if (clientState?.connected && data) {
      console.log(clientState?.connected);
      navigate(`/host/quiz/${data?.roomId}`);
    }
  }, [clientState]);

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
                  startQuiz();
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
