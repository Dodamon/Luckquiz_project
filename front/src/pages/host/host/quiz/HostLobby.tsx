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

const HostLobby = () => {
  const { quiz_id } = useParams();
  const userId = useSelector((state :RootState) => state.auth.userId)
  const dispatch = useDispatch()
  return (
    <div className={styles.container}>
      <div style={{ display: "flex", justifyContent:"space-between"}}>
        <img src={logo} alt="" className={styles.logo}/>
        <div className={styles.whiteBox}>
          <div className={styles.pinBox}>
            <p>퀴즈 입장 pin번호</p>
            <p>{quiz_id}</p>
          </div>
          <img src={qr_sample} alt="" />
        </div>
      </div>
      <LobbyComp />
      <ButtonWithLogo name="시작하기" height="40px" fontSize="20px" callback={dispatch(socketActions.sendAnswerMessage({roomId: quiz_id, hostId: userId}))}/>
    </div>
  );
};
export default HostLobby;
