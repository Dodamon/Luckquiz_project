import logo from "assets/images/logo.png";
import styles from "./ShowPin.module.css";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface Props {
  url: string;
}

const ShowPin = () => {
  const { quiz_id } = useParams();
  const navigate = useNavigate();
  const guestList = useSelector((state: RootState) => state.socket.guestList);
  const qrCode = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=https://luckquiz.co.kr/guest/nickname?pinnum=${quiz_id}`;
  const location = window.location.href.includes("local") ? "http://localhost:3000" : process.env.REACT_APP_HOST;
  const url = `${location}/guest/quiz/${quiz_id}`;

  useEffect(() => {
    console.log(guestList);
    if (guestList && guestList.length >= 1) {
      navigate(`/host/quiz/${quiz_id}/lobby`);
    }
    
  }, [guestList, navigate, quiz_id]);

  const handleClick = ({ url }: Props) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log("Text copied to clipboard:", url);
        toast("📋참여자 입장 링크가 복사되었습니다")
      })
      .catch((error) => {
        console.error("Failed to copy text to clipboard:", error);
      });
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="" className={styles.logo} />
      <div className={styles.whiteBox}>
        <img
          src={qrCode}
          alt=""
          onClick={() => {
            handleClick({ url : url });
          }}
          className={styles.qrCode}
        />
        <div className={styles.pinBox}>
          <p>퀴즈 입장 핀 번호</p>
          <div className={styles.pinNum}>{quiz_id}</div>
        </div>
      </div>
    </div>
  );
};

export default ShowPin;
