import React from "react";
import styles from "./ReadyBalloonGame.module.css";
import ReadyBalloonGame from "components/game/balloon/ReadyBalloonGame";

const ReadyGame: React.FC = () => {
  
  
  return (
    <div className={styles.ReadyBalloonContainer}>
      <ReadyBalloonGame/>
      {/* loading spinner */}
    </div>
  );
};

export default ReadyGame;