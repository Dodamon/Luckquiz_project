import React from 'react';
import styles from "./GameCreateLayout.module.css"
import GameSelection from './GameSelection';
// import QuizSelectMenu from './QuizSelectMenu';
import GameTemplate from './GameTemplate';
import QuizSelectMenu from './QuizSelectMenu';
import GameTotalTemplate from './GameTotalTemplate';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const GameCreateLayout = () => {
  const quizInfo = useSelector((state: RootState) => state.quiz.quizList);
  const selectInfo = useSelector((state: RootState) => state.auth.choiceIndex);

  return (
    <div className={styles.GameCreateLayout}>
      {
              quizInfo[selectInfo].game === "" ? <GameSelection /> : <> <QuizSelectMenu /><GameTotalTemplate /></>
      }
    </div>
  );
};

export default GameCreateLayout;