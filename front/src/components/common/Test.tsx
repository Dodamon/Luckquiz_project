import Podium from "components/common/Podium";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Podiumcopy.module.css";
import ButtonWithLogo from "components/common/ButtonWithLogo";
import { useState, useRef, useEffect } from "react";
import QuizRanking from "components/quiz/QuizRanking";
import { RootState } from "store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { socketActions } from "store/webSocket";
import pngwing from "assets/images/pngwing.png";
import NameTag from "./NameTag";
import { IMAGES } from "components/guest/ProfileNickname";
import confetti from "canvas-confetti";
import lottie, { AnimationItem } from "lottie-web";
import animationData from "./Podium.json";


const Test = () => {
  const { quiz_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isHost = useSelector((state: RootState) => state.auth.isAuthenticated);

  const [modalOn, SetModalOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
    const aniBox = useRef<HTMLDivElement>(null);
    const finalResult = useSelector((state: RootState) => state.socket.getFinalResultList);
    const minGuest = finalResult?.length;
    const [showFirstProfile, setShowFirstProfile] = useState(false);
    const [showSecondProfile, setShowSecondProfile] = useState(false);
    const [showThirdProfile, setShowThirdProfile] = useState(false);

    useEffect(() => {
      // 시상대 json animation
      const animationParams: Parameters<typeof lottie.loadAnimation>[0] = {
        container: aniBox.current!,
        renderer: "svg",
        loop: false, // loop 옵션을 false로 설정
        autoplay: true,
        animationData: animationData,
      };

      const animationInstance: AnimationItem = lottie.loadAnimation(animationParams);

      // 시상대에 맞게 순위별 프로필 랜더링
      setTimeout(() => {
        setShowFirstProfile(true);
      }, 990);
      setTimeout(() => {
        setShowSecondProfile(true);
      }, 1415);
      setTimeout(() => {
        setShowThirdProfile(true);
      }, 1985);

      setTimeout(() => {
        confetti({
          particleCount: 500,
          spread: 1000,
          origin: {
            x: 0.5,
            // since they fall down, start a bit higher than random
            y: 0.5,
          },
        });
      }, 1950);

      // 랜더링 후 비정상적인 종료시, animation 과 프로필 제거
      return () => {
        animationInstance.destroy();
        setShowFirstProfile(false);
        setShowSecondProfile(false);
        setShowThirdProfile(false);
      };
    }, []);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        SetModalOn(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      {modalOn && <QuizRanking />}
      <div className={styles.flexend}>
        <div ref={ref} className={styles.open_btn} onClick={() => SetModalOn((pre) => !pre)}>
          <img src={pngwing} alt="" />
          <div className={styles.text}>전체 랭킹</div>
        </div>
      </div>
      <div className={styles.podium}>
        <div className={styles.container2}>
          {(
            <div className={styles.profileBox} style={{ position: "absolute", left: "31%", bottom: "56.5%" }}>
              <img src={IMAGES[0]} alt="" className={styles.profileImg} />
              <NameTag subtitle={"아아아아아아"} />
            </div>
          )}
          {(
            <div className={styles.profileBox} style={{ position: "absolute", left: "-4%", bottom: "45%" }}>
              <img src={IMAGES[0]} alt="" className={styles.profileImg} />
              <NameTag subtitle={"yejin Lee"} />
            </div>
          )}
          {(
            <div className={styles.profileBox} style={{ position: "absolute", left: "66%", bottom: "35.5%" }}>
              <img src={IMAGES[3]} alt="" className={styles.profileImg} />
              <NameTag subtitle={"wertyuu"} />
            </div>
          )}
          <div ref={aniBox}></div>
        </div>
      </div>
      {isHost && (
        <ButtonWithLogo
          name="레포트 보러가기"
          fontSize="18px"
          height="45px"
          onClick={() => {
            dispatch(socketActions.resetSocket()); // 퀴즈 종료 -> 웹소켓에 저장된 퀴즈와 결과 데이터 삭제
            navigate("/home/report");
          }}
        />
      )}
    </div>
  );
};
export default Test;
