import React, { useEffect, useRef, useState } from "react";
import egg from "assets/images/balloongame.png";
import brokenegg from "assets/images/luckqui.png";
import egg_top from "assets/images/egg_top.png";
import egg_bottom from "assets/images/egg_bottom.png";
import luckqui from "assets/images/luckqui2.png";
import styles from "./WakeUpGame.module.css";

interface Props {
  breakNum?: number;
}

const WakeUpGameMobile = (props: Props) => {
  const { breakNum } = props;
  // const [brokenNum, setBrokenNum] = useState(breakNum);
  const [brokenNum, setBrokenNum] = useState(23);
  const [shakeCount, setShakeCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [isBroken, setIsBroken] = useState(false);
  const [showluckqui, setShowLuckqui] = useState(false);

  // 접속기기 확인
  const detectMobileDevice = (agent: string) => {
    const mobileRegex = [/Android/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];
    console.log(agent);
    return mobileRegex.some((mobile) => agent.match(mobile));
  };

  const isMobile = detectMobileDevice(window.navigator.userAgent);

  const handleMobileShake = (event: React.TouchEvent<HTMLDivElement>) => {
    console.log("shaked");
    setIsShaking(true);
    setShakeCount((prev) => prev + 1);

    setTimeout(() => {
      setIsShaking(false);
    }, 500);
  };

  const handleWebShake = (event: KeyboardEvent) => {
    if (event.code === "Space" && !isBroken) {
      event.preventDefault();
      console.log("shaked");
      setIsShaking(true);
      setShakeCount((prev) => prev + 1);
    }
    setTimeout(() => {
      setIsShaking(false);
    }, 500);
  };

  useEffect(() => {
    if (shakeCount > 0 && shakeCount < brokenNum) {
      setIsShaking(true);
    } else if (shakeCount >= brokenNum) {
      setIsBroken(true);
      // window.removeEventListener("keydown", handleShake());
      setIsShaking(false);
    }
  }, [shakeCount, setIsBroken]);

  // web이면, keydown listner작동
  useEffect(() => {
    !isMobile && window.addEventListener("keydown", handleWebShake);
    return () => {
      window.removeEventListener("keydown", handleWebShake);
    };
  }, []);

  useEffect(() => {
    if (isBroken) {
      setTimeout(() => {
        setShowLuckqui(true);
        console.log("show");
      }, 1200);
    }
  }, [isBroken, setShowLuckqui]);

  return (
    <div id="content">
      <div id="time-box">{} 초</div>
      <div id="game-description">
        {isMobile ? "알을 터치하여 럭퀴를 깨워주세요" : "스페이스 바를 눌러 럭퀴를 흔들어 깨워주세요"}
      </div>
      <div className={styles.container}>
        {/* <h1>Shake the Egg!</h1> */}
        {isBroken ? (
          showluckqui ? (
            <>
              <div className={styles.eggContainer}>
                <div className={styles.eggImg}>
                  <img src={egg_top} alt="" className={styles.eggTop} />
                  <img src={luckqui} alt="" className={styles.luckqui} />
                  <img src={egg_bottom} alt="" className={styles.eggBottom} />
                </div>
                <div className={styles.eggShadow}></div>
              </div>
              <h2>You woke Luckqui up!</h2>
            </>
          ) : (
            <div className={styles.eggContainer}>
              <div className={styles.egg}></div>
              <div className={styles.crack}>
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
              <div className={styles.eggShadow}></div>
            </div>
          )
        ) : (
          <div className={styles.eggContainer}>
            <div
              className={isShaking ? styles.shakingEgg : styles.egg}
              onTouchStart={(e) => {
                isMobile && handleMobileShake(e);
              }}
            ></div>
            <div className={isShaking ? styles.shakingEggShadow : styles.eggShadow}></div>
            <p>{shakeCount}번</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WakeUpGameMobile;
