import React from 'react';
import styles from "./GameCreateLayout.module.css"
import GameSelection from './GameSelection';
// import QuizSelectMenu from './QuizSelectMenu';
import GameTemplate from './GameTemplate';

const GameCreateLayout = () => {
    return (
        <div className={styles.GameCreateLayout}>
  
          <GameTemplate/>


        
        </div>
    );
};

export default GameCreateLayout;