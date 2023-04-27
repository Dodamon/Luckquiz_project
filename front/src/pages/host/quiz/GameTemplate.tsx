import React from 'react';
import QuizSelectMenu from './QuizSelectMenu';
import styles from './GameTemplate.module.css'
import GameEmotionTemplate from './GameEmotionTemplate';
import wakeup from '../../../assets/images/wakeup_game.png'
import GameTotalTemplate from './GameTotalTemplate';
const GameTemplate = () => {
    return (
        <>
            <QuizSelectMenu/>
            <GameTotalTemplate/>
         

        </>
    );
};

export default GameTemplate;