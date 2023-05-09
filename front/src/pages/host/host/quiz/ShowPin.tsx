import logo from "assets/images/logo.png";
import styles from "./ShowPin.module.css";
import { useParams } from "react-router";
import qr_sample from "assets/images/qr_sample.png";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { subscribeThunk } from "store/webSocket";
import { useAppDispatch } from "hooks/useAppDispatch";

const ShowPin = () => {
  const hostInfo = useSelector((state: RootState) => state.auth)
  const client = useSelector((state: RootState) => state.socket.client);
  const { quiz_id } = useParams();
  const appDispatch = useAppDispatch();

  useEffect(() => {
    if (!client.connected) {
      if (typeof quiz_id === "string") appDispatch(subscribeThunk(quiz_id));
    }
  },[]);


  return (
    <div className={styles.container}>
      <img src={logo} alt="" className={styles.logo} />
      <div className={styles.whiteBox}>
        <div className={styles.pinBox}>
          <p>퀴즈 입장 pin번호</p>
          <p>{quiz_id}</p>
        </div>
        <img src={qr_sample} alt="" />
      </div>
    </div>
  );
};

export default ShowPin;
