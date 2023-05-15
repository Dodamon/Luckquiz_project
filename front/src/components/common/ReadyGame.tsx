import React from "react";
import styles from "./ReadyGame.module.css";
import logoCat from "assets/images/logoCharacter.png";
import ReadyBalloonGame from "components/game/balloon/ReadyBalloonGame";
import ReadyEmotionGame from "components/game/emotion/ReadyEmotionGame";
import ReadyWakeupGame from "components/game/wakeup/ReadyWakeupGame";
import LoadingSpinner from "./LoadingSpinner";
import { useSelector } from "react-redux";
import { RootState } from "store";

interface Props {
  handleOrder?: Function;
}

const ReadyGame = ({ handleOrder }: Props) => {
  const type = useSelector((state : RootState) => state.socket.quizItem?.game)
  
  // 게임 시작 전에 게스트/호스트 동시에 보여주는 설명 시간
  // 일때만, 시간 지나면 order 0으로 바꿔주기
  handleOrder &&
    setTimeout(() => {
      handleOrder(0);
    }, 3800);

  return (
    <div className={styles.ReadyGameContainer}>
      <img src={logoCat} alt="" className={styles.logoCatImg} />
      <div className={styles.gameContainer}>
        {type === "balloon" && <ReadyBalloonGame />}
        {type === "emotion" && <ReadyEmotionGame />}
        {type === "wakeup" && <ReadyWakeupGame />}
      </div>
      {/* <div>
        <LoadingSpinner text="잠시만 기다려 주세요"/>
      </div> */}
    </div>
  );
};

export default ReadyGame;
