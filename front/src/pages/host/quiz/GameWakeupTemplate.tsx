import React from "react";
import styles from "./GameWakeupTemplate.module.css";
import wakeup from "../../../assets/images/wakeup_game.png";
import QuizGameTitle from "components/common/QuizGameTitle";

const GameWakeupTemplate = () => {
  return (
    <>
      <div className={styles.gameTitle}>
        <QuizGameTitle title="일어나 럭퀴야 학교 가야지" />
      </div>
      <div className={styles.shake_content}>
        <div className={styles.shake_title}>
          <div className={styles.shake_explain}>상단 메뉴에서 게임이 진행될 시간을 선택하세요.</div>
          <div className={styles.shake_discription}>
            <p>럭퀴를 가장 많이 터치하여 깨운 사람부터 순차적으로 점수가 부여됩니다.</p>
            <p>PC로 참여시, 스페이스 바를 눌러주세요.</p>
          </div>
        </div>
        <div className={styles.shake_img}>
          <img src={wakeup} alt="럭퀴" />
        </div>
      </div>
    </>
  );
};

export default GameWakeupTemplate;
