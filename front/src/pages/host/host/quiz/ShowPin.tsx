import logo from "assets/images/logo.png";
import styles from "./ShowPin.module.css";
import { useNavigate, useParams } from "react-router";
import qr_sample from "assets/images/qr_sample.png";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useEffect } from "react";

const ShowPin = () => {
  const { quiz_id } = useParams();
  const guestList = useSelector((state: RootState) => state.socket.guestList);
  const navigate = useNavigate();
  useEffect(() => {
    if (guestList.length >= 2) {
      navigate(`/host/quiz/${quiz_id}/lobby`);
    }
  }, [guestList.length, navigate, quiz_id]);

  return (
    <div className={styles.container}>
      <img src={logo} alt="" className={styles.logo} />
      <div className={styles.whiteBox}>
        <div className={styles.pinBox}>
          <p>퀴즈 입장 pin번호</p>
          <p>{quiz_id}</p>
        </div>
        {/* <img src={qr_sample} alt="" onClick={() => {navigate(`/host/quiz/${quiz_id}/lobby`)}}/> */}
        <img src={qr_sample} alt="" onClick={() => {navigate(`/host/quiz/3670055/lobby`)}}/>
        
      </div>
    </div>
  );
};

export default ShowPin;
