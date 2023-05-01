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
          게임이 시작되면 마음 속으로 초를 세보세요. 주어진 시간이 흘렀다고 생각될 때 풍선을 터트립니다. 가장 근접한 시간에 풍선을 터트린 사람부터 점수를 부여받습니다.
        </div>
      </div>
    </>
  );
};

export default ReadyBalloonGame;
