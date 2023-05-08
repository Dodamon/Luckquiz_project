import React, { useEffect, useRef, useState } from "react";
import egg from "assets/images/balloongame.png";
import brokenegg from "assets/images/luckqui.png";
import egg_top from "assets/images/egg_top.png";
import egg_bottom from "assets/images/egg_bottom.png";
import luckqui from "assets/images/luckqui2.png";
import styles from "./WakeUpGame.module.css";

interface Props {
  breakNum? : number
}

const WakeUpGameWeb = (props : Props) => {
  const { breakNum } = props
  // const [brokenNum, setBrokenNum] = useState(breakNum);
  const [brokenNum, setBrokenNum] = useState(23);
  const [shakeCount, setShakeCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [isBroken, setIsBroken] = useState(false);
  const [showluckqui, setShowLuckqui] = useState(false);
  const eggRef = useRef<HTMLImageElement>(null);

  const handleShake = (event: KeyboardEvent) => {
    if (event.code === "Space" && !isBroken) {
      event.preventDefault();
      console.log("shaked");
      setIsShaking(true);
      setShakeCount(shakeCount + 1);
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
      window.removeEventListener("keydown", handleShake);
      setIsShaking(false);
    }
  }, [shakeCount, setIsBroken]);

  useEffect(() => {
    window.addEventListener("keydown", handleShake);
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
        </div>
      )}
    </div>
  );
};

export default WakeUpGameWeb;
