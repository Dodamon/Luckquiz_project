import React from "react";
import styles from "../ReadyDescription.module.css";
import emotionGame from "assets/images/emotion_game.png";

const ReadyEmotionGame: React.FC = () => {
  return (
    <>
      <div className={styles.imgWrapper}>
        <img src={emotionGame} alt="" className={styles.gameImg} />
      </div>
      <div className={styles.gameDescriptionWrapper}>
        <div className={styles.gameName}>지금만큼은 나도 연기 왕</div>
        <div className={styles.gameDescription}>
          게임이 시작되면 미션으로 주어진 감정에 맞는 표정을 셀카로 찍어 업로드 합니다. 표정을 분석하여 미션 감정의 수치가 가장 높게 나온 사람부터 순차적으로 점수가 부여됩니다. 
        </div>
      </div>
    </>
  );
};

export default ReadyEmotionGame;
