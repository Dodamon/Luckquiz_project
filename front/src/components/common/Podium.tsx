import lottie, { AnimationItem } from "lottie-web";
import animationData from "./Podium.json";
import styles from "./Podium.module.css";
import { useEffect, useRef, useState } from "react";
import profile1 from "assets/profile/profile1.png";
import profile2 from "assets/profile/profile2.png";
import profile3 from "assets/profile/profile3.png";
import confetti from "canvas-confetti";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { IMAGES } from "components/guest/ProfileNickname"

const Podium = () => {
  const aniBox = useRef<HTMLDivElement>(null);
  const finalResult = useSelector((state: RootState) => state.socket.getFinalResultList)
  const minGuest = finalResult?.length
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

  return (
    <div className={styles.container}>
      {finalResult && showFirstProfile && (
        <div className={styles.profileBox} style={{ position: "absolute", left: "31%", bottom: "56.5%" }}>
          <img src={IMAGES[finalResult[0].img]} alt="" className={styles.profileImg} />
          <div className={styles.nameTag}>{finalResult[0].sender}</div>
        </div>
      )}
      {finalResult && minGuest! >= 2 && showSecondProfile && (
        <div className={styles.profileBox} style={{ position: "absolute", left: "-4%", bottom: "45%" }}>
          <img src={IMAGES[finalResult[1].img]} alt="" className={styles.profileImg} />
          <div className={styles.nameTag}>{finalResult[1].sender}</div>
        </div>
      )}
      {finalResult && minGuest! >= 3 && showThirdProfile && (
        <div className={styles.profileBox} style={{ position: "absolute", left: "66%", bottom: "35.5%" }}>
          <img src={IMAGES[finalResult[2].img]} alt="" className={styles.profileImg} />
          <div className={styles.nameTag}>{finalResult[2].sender}</div>
        </div>
      )}
      <div ref={aniBox}></div>
    </div>
  );
};

export default Podium;
