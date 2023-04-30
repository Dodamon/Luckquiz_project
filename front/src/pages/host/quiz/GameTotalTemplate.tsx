import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import GameEmotionTemplate from './GameEmotionTemplate';
import GameWakeupTemplate from './GameWakeupTemplate';
// 게임 재사용 페이지
const GameTotalTemplate = () => {

    const quizInfo = useSelector((state: RootState) => state.quiz);
    const selectInfo = useSelector((state: RootState) => state.auth);


    return (
        <>
            {
                quizInfo.quizList[selectInfo.choiceType].game === "emotion" ? <GameEmotionTemplate /> : quizInfo.quizList[selectInfo.choiceType].game === "wakeup" ? <GameWakeupTemplate /> : <></>
            }
        </>
    );
};

export default GameTotalTemplate;