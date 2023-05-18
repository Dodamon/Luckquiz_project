import React, { useEffect } from 'react';
import QuizSelectMenu from './QuizSelectMenu';
import QuizFourTemplate from './QuizFourTemplate';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import QuizOxTemplate from './QuizOxTemplate';
import QuizShortTemplate from './QuizShortTemplate';



const QuizCreateLayout = () => {
    const quizInfo = useSelector((state: RootState) => state.quiz.quizList);
    const selectInfo = useSelector((state: RootState) => state.auth.choiceIndex);
  
    return (
        <>
            <QuizSelectMenu/>
            {
               quizInfo[selectInfo]?.quiz==="four"? <QuizFourTemplate num={selectInfo}/>:quizInfo[selectInfo]?.quiz==="ox"? <QuizOxTemplate num={selectInfo}/>:<QuizShortTemplate num={selectInfo}/>
            }
           
        </>
    );
};

export default QuizCreateLayout;