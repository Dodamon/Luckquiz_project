import React from 'react';
import QuizSelectMenu from './QuizSelectMenu';
import styles from './GameTemplate.module.css'
import GameEmotionTemplate from './GameEmotionTemplate';
import wakeup from '../../../assets/images/wakeup_game.png'
import GameTotalTemplate from './GameTotalTemplate';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import GameSelection from './GameSelection';
const GameTemplate = () => {
    const quizInfo = useSelector((state: RootState) => state.quiz.quizList);
    const selectInfo = useSelector((state: RootState) => state.auth.choiceIndex);
    
    return (
        <>{

            quizInfo[selectInfo].game===""? <GameSelection/>:<> <QuizSelectMenu/>
            <GameTotalTemplate/></>

           
          }
           
         
        </>
    );
};

export default GameTemplate;