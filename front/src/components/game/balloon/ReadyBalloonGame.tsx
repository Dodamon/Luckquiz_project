import React from "react";
import balloon from "assets/images/balloongame.png";
import styles from "../ReadyDescription.module.css";

const ReadyBalloonGame: React.FC = () => {
  return (
    <>
      <div className={styles.imgWrapper}>
        <img src={balloon} alt="" className={styles.gameImg} />
      </div>
      <div className={styles.gameDescriptionWrapper}>
        <div className={styles.gameName}>풍선 터트리기</div>
        <div className={styles.gameDescription}>
          <p>게임이 시작되면 마음 속으로 초를 세보세요.</p>
          <p>9.49초가 흘렀다고 생각될 때 풍선을 터트립니다.</p>
          <p>가장 근접한 시간에 풍선을 터트린 사람부터 순차적으로 점수를 부여받습니다.</p>
        </div>
      </div>
    </>
  );
};

export default ReadyBalloonGame;
