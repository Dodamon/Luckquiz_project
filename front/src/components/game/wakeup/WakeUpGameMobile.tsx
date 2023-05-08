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
  const [brokenNum, setBrokenNum] = useState(23); // egg가 깨지는 횟수
  const [shakeCount, setShakeCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [isBroken, setIsBroken] = useState(false);
  const [showluckqui, setShowLuckqui] = useState(false);
  const eggRef = useRef<HTMLImageElement>(null);
  const [xSpeed, setXSpeed] = useState(0);

  const handleShake = (event: { accelerationIncludingGravity: any }) => {
    // console.log(event);
    let shakeThreshold = 1000; // set the shake threshold
    let lastUpdate = 0;
    let x = 0,
      y = 0,
      z = 0;
    let lastX = 0,
      lastY = 0,
      lastZ = 0;

    let acceleration = event.accelerationIncludingGravity;
    let curTime = new Date().getTime();

    if (curTime - lastUpdate > 100) {
      let diffTime = curTime - lastUpdate;
      lastUpdate = curTime;

      x = acceleration.x;
      y = acceleration.y;
      z = acceleration.z;

      let speed = (Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime) * 10000;

      if (speed > shakeThreshold) {
        console.log("shaked");
        setIsShaking(true);
        setShakeCount(shakeCount + 1);
      }

      let xDiff = Math.abs(x - lastX);
      let xspeed = (xDiff / diffTime) * 10000; // calculate x-axis speed
      setXSpeed(xspeed); // update x-axis speed state

      // 0.5초 이내에 이벤트가 없으면 isShaking -> false
      setTimeout(() => {
        setIsShaking(false);
      }, 500);

      lastX = x;
      lastY = y;
      lastZ = z;
    }
  };
  useEffect(() => {
    window.addEventListener("devicemotion", handleShake);
    // return () => {
    //   window.removeEventListener("devicemotion", handleShake);
    // };
  }, []);

  useEffect(() => {
    // brokenNum을 아직 못채웠을 때, 흔들면
    if (shakeCount > 0 && shakeCount < brokenNum) {
      // 흔드는 중
      setIsShaking(true);
    } else if (shakeCount >= brokenNum) {
      // brokenNum을 채웠으면,
      // isBroken -> true
      setIsBroken(true);
      // 이벤트 리스너 제거
      window.removeEventListener("devicemotion", handleShake);
      // isShaking -> false
      setIsShaking(false);
    }
  }, [shakeCount, setIsBroken]);

  // const handleShake = (event: KeyboardEvent) => {
  //   if (event.code === "Space" && !isBroken) {
  //     event.preventDefault();
  //     console.log("shaked");
  //     setIsShaking(true);
  //     setShakeCount((prev) => prev + 1);
  //   }
  //   // 0.5초 이내에 이벤트가 없으면 isShaking -> false
  //   setTimeout(() => {
  //     setIsShaking(false);
  //   }, 500);
  // };

  // useEffect(() => {
  //   // brokenNum을 아직 못채웠을 때, 흔들면
  //   if (shakeCount > 0 && shakeCount < brokenNum) {
  //     // 흔드는 중
  //     setIsShaking(true);
  //   } else if (shakeCount >= brokenNum) {
  //     // brokenNum을 채웠으면,
  //     // isBroken -> true
  //     setIsBroken(true);
  //     // 이벤트 리스너 제거
  //     window.removeEventListener("keydown", handleShake);
  //     // isShaking -> false
  //     setIsShaking(false);
  //   }
  // }, [shakeCount, setIsBroken]);

  // useEffect(() => {
  //   window.addEventListener("keydown", handleShake);
  //   return () => {
  //     window.removeEventListener("keydown", handleShake);
  //   };
  // }, [handleShake]);

  useEffect(() => {
    //
    if (isBroken) {
      // 흔드는 애니메이션이 끝나면 애니메이션 보여주기
      setTimeout(() => {
        setShowLuckqui(true);
        console.log("show");
      }, 1200);
    }
  }, [isBroken, setShowLuckqui]);

  return (
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
          <div className={isShaking ? styles.shakingEgg : styles.egg}></div>
          <div className={isShaking ? styles.shakingEggShadow : styles.eggShadow}></div>
          <p>You shook your device {shakeCount} times!</p>
          <p>X-axis speed: {xSpeed} m/s²</p>
        </div>
      )}
    </div>
  );
};

export default WakeUpGameMobile;
