import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import GameEmotionTemplate from './GameEmotionTemplate';
import GameWakeupTemplate from './GameWakeupTemplate';
// 게임 재사용 페이지
const GameTotalTemplate = () => {

    const quizInfo = useSelector((state: RootState) => state.quiz.quizList);
    const selectInfo = useSelector((state: RootState) => state.auth.choiceIndex);


    return (
        <>
            {
                quizInfo[selectInfo].game === "egg" ? <GameEmotionTemplate /> : quizInfo[selectInfo].game === "wakeup" ? <GameWakeupTemplate /> : <></>
            }
        </>
    );
};

export default GameTotalTemplate;