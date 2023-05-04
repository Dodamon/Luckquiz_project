import logo from "assets/images/logo.png";
import styles from "./ShowPin.module.css";
import { useParams } from "react-router";
import qr_sample from "assets/images/qr_sample.png";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { socketActions } from "store/webSocket";

const ShowPin = () => {
  const dispatch = useDispatch();
  const hostInfo = useSelector((state: RootState) => state.auth)
  const client = useSelector((state: RootState) => state.socket.client);

  useEffect(() => {
    if (!client.connected) {
      const socketProps = {
        name: hostInfo.nickname,
        img: hostInfo.image_url,
        subscribeURL: 123,
      };
      dispatch(socketActions.subscribe(socketProps));
    }
  },[]);

  const { quiz_id } = useParams();
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
