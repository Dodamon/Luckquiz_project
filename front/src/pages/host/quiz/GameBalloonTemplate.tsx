import React from "react";
import styles from "./GameWakeupTemplate.module.css";
import pop from "../../../assets/images/pop_game.png";
import QuizGameTitle from "components/common/QuizGameTitle";

const GameBalloonTemplate = () => {
  return (
    <>
      <div className={styles.gameTitle}>
        <QuizGameTitle title="9.49초 맞추기" />
      </div>
      <div className={styles.shake_content}>
        <div className={styles.shake_title}>
          <div className={styles.shake_explain}>상단 메뉴에서 게임이 진행될 시간을 선택하세요</div>
        </div>
        <div className={styles.shake_discription}>
          <p>게임이 시작되면 마음 속으로 초를 세보세요.</p>
          <p>9.49초가 흘렀다고 생각될 때 풍선을 터트립니다.</p>
          <p>가장 근접한 시간에 풍선을 터트린 사람부터 순차적으로 점수를 부여받습니다.</p>
        </div>
        <div className={styles.shake_img}>
          <img src={pop} alt="balloon" />
        </div>
      </div>
    </>
  );
};

export default GameBalloonTemplate;
