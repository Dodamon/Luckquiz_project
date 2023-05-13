import logo from "assets/images/logo.png";
import styles from "./ShowPin.module.css";
import { useNavigate, useParams } from "react-router";
import qr_sample from "assets/images/qr_sample.png";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useEffect } from "react";

const ShowPin = () => {
  const { quiz_id } = useParams();
  const qrCode = `https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=https://k8a707.p.ssafy.io/guest/nickname?pinnum=${quiz_id}`;
  // const qrCode = `https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=https://localhost:3000/guest/nickname?pinnum=${quiz_id}`;
  const guestList = useSelector((state: RootState) => state.socket.guestList);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(guestList)
    if (guestList && guestList.length >= 1) {
      navigate(`/host/quiz/${quiz_id}/lobby`);
    }
  }, [guestList, navigate, quiz_id]);

  return (
    <div className={styles.container}>
      <img src={logo} alt="" className={styles.logo} />
      <div className={styles.whiteBox}>
        <img src={qrCode} alt="" onClick={() => {navigate(`/host/quiz/${quiz_id}/lobby`)}} className={styles.qrCode}/>       
        <div className={styles.pinBox}>
          <p>퀴즈 입장 핀 번호</p>
          <div className={styles.pinNum}>{quiz_id}</div>
        </div>
      </div>
    </div>
  );
};

export default ShowPin;
