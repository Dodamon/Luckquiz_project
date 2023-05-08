import logo from "assets/images/logo.png";
import styles from "./ShowPin.module.css";
import { useParams } from "react-router";
import qr_sample from "assets/images/qr_sample.png";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { socketActions } from "store/webSocket";

const ShowPin = () => {
  const { quiz_id } = useParams();
  const dispatch = useDispatch();
  const hostInfo = useSelector((state: RootState) => state.auth);
  const clientState = useSelector((state: RootState) => state.socket.client);

  useEffect(() => {
    console.log(clientState?.connected)
    if (clientState?.connected) {
      const socketProps = {
        name: hostInfo.nickname,
        img: hostInfo.image_url,
        roomId: quiz_id
      };
    //   setTimeout(() => {
        dispatch(socketActions.subscribe(socketProps));
    //   }, 1000);
    }
  }, []);

  useEffect(() =>{
    console.log('sendEnter')
    dispatch(socketActions.sendEnterMessage({name : hostInfo.nickname, img : hostInfo.image_url}))
  },[clientState])

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
