import styles from "./QuizGameTitle.module.css";
import React from "react";
import BalloonGame from "components/game/balloon/BalloonGame";
import logoCat from "assets/images/logoCharacter.png";

interface Props {
  title : string
}

const QuizGameTitle = (props: Props) => {
  const { title } = props
  return (
    <div className={styles.titleContainer}>
      <img src={logoCat} alt="" className={styles.logoCatImg} />
      <div className={styles.gameTitle}>{title}</div>
    </div>
  );
};

export default QuizGameTitle;
