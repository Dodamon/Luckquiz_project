import React from "react";
import styles from "../ReadyDescription.module.css";
import luckqui from "assets/images/luckqui.png";

const ReadyWakeupGame: React.FC = () => {
  return (
    <>
      <div className={styles.imgWrapper}>
        <img src={luckqui} alt="" className={styles.gameImg} />
      </div>
      <div className={styles.gameDescriptionWrapper}>
        <div className={styles.gameName}>일어나 럭퀴야 학교 가야지</div>
        <div className={styles.gameDescription}>
          알 속의 럭퀴를 깨워주세요!
          <br />
          럭퀴를 가장 많이 터치하여 깨운 순차적으로 점수가 부여됩니다.
          <br />
          pc로 참여시, space bar를 눌러주세요.
        </div>
      </div>
    </>
  );
};

export default ReadyWakeupGame;
