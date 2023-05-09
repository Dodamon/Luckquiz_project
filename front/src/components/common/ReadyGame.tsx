import React from "react";
import styles from "./ReadyGame.module.css";
import logoCat from "assets/images/logoCharacter.png";
import ReadyBalloonGame from "components/game/balloon/ReadyBalloonGame";
import ReadyEmotionGame from "components/game/emotion/ReadyEmotionGame";
import ReadyWakeupGame from "components/game/wakeup/ReadyWakeupGame";
import LoadingSpinner from "./LoadingSpinner";

const ReadyGame: React.FC = () => {
  return (
    <div className={styles.ReadyGameContainer}>
      <img src={logoCat} alt="" className={styles.logoCatImg} />
      <div className={styles.gameContainer}>
        {/* <ReadyBalloonGame /> */}
        {/* <ReadyEmotionGame/> */}
        <ReadyWakeupGame/>
      </div>
      <div>
        <LoadingSpinner text="잠시만 기다려 주세요"/>
      </div>
    </div>
  );
};

export default ReadyGame;
