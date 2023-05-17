import LobbyComp from "components/common/lobby/LobbyComp";
import styles from "./ShowPin.module.css";
import logo from "assets/images/logo.png";
import qr_sample from "assets/images/qr_sample.png";
import ButtonWithLogo from "components/common/ButtonWithLogo";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { socketActions } from "store/webSocket";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HostLobby = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quiz_id } = useParams();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const quizItem = useSelector((state: RootState) => state.socket.quizItem);
  const qrCode = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=https://luckquiz.co.kr/guest/nickname?pinnum=${quiz_id}`;
  // const qrCode = `https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=https://localhost:3000/guest/nickname?pinnum=${quiz_id}`;

  useEffect(() => {
    quizItem && navigate(`/host/quiz/${quiz_id}/play`);
  }, [navigate, quizItem, quiz_id]);

  return (
    <div className={styles.container}>
      <div className={styles.qrPinWrapper}>
        <img src={logo} alt="" className={styles.logo} />
        <div className={styles.whiteBox}>
          <img
            src={qrCode}
            alt=""
            onClick={() => {
              navigate(`/host/quiz/${quiz_id}/lobby`);
            }}
            className={styles.qrCode}
          />
          <div className={styles.pinBox}>
            <p>퀴즈 입장 pin번호</p>
            <p>{quiz_id}</p>
          </div>
        </div>
      </div>
      <LobbyComp />
      <ButtonWithLogo
        name="시작하기"
        height="40px"
        fontSize="20px"
        onClick={() =>
          dispatch(
            socketActions.sendAnswerMessage({
              destination: "/app/quiz/start",
              body: { hostId: userId, roomId: quiz_id },
            }),
          )
        }
      />
    </div>
  );
};
export default HostLobby;
