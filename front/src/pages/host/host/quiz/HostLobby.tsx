import LobbyComp from "components/common/lobby/LobbyComp";
import styles from "./ShowPin.module.css";
import logo from "assets/images/logo.png";
import qr_sample from "assets/images/qr_sample.png";
import ButtonWithLogo from "components/common/ButtonWithLogo";
import { useParams } from "react-router";

const HostLobby = () => {
  const { quiz_id } = useParams();
  return (
    <div className={styles.container}>
      <div style={{ display: "flex" }}>
        <img src={logo} alt="" className={styles.logo} />
        <div className={styles.whiteBox} style={{scale: "0.7"}}>
          <div className={styles.pinBox}>
            <p>퀴즈 입장 pin번호</p>
            <p>{quiz_id}</p>
          </div>
          <img src={qr_sample} alt="" />
        </div>
      </div>
      <LobbyComp />
      <ButtonWithLogo name="시작하기" />
    </div>
  );
};
export default HostLobby;
