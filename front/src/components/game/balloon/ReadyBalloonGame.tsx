import React from "react";
import balloon from "assets/images/balloongame.png";
import logoCat from "assets/images/logoCharacter.png";
import styles from "../GameDescriptionReady.module.css";

const ReadyBalloonGame: React.FC = () => {
  return (
    <>
      <img src={logoCat} alt="" className={styles.logoCatImg} />
      <div className={styles.gameContainer}>
        <div className={styles.imgWrapper}>
          <img src={balloon} alt="" className={styles.gameImg} />
        </div>
        <div className={styles.gameDescriptionWrapper}>
          <div className={styles.gameName}>풍선 터트리기</div>
          <div className={styles.gameDescription}>게임 설명</div>
        </div>
      </div>
    </>
  );
};

export default ReadyBalloonGame;
