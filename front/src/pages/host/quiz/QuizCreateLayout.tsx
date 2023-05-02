import React from 'react';
import QuizSelectMenu from './QuizSelectMenu';
import QuizTemplate from './QuizTemplate';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import QuizOxTemplate from './QuizOxTemplate';
import QuizShortTemplate from './QuizShortTemplate';

const QuizCreateLayout = () => {
    const quizInfo = useSelector((state: RootState) => state.quiz.quizList);
    const selectInfo = useSelector((state: RootState) => state.auth.choiceIndex);
    console.log(selectInfo);
    
    console.log(quizInfo);
    
    return (
        <>
            <QuizSelectMenu/>
            {
                
               quizInfo[selectInfo]?.quiz==="four"? <QuizTemplate/>:quizInfo[selectInfo]?.quiz==="ox"? <QuizOxTemplate/>:<QuizShortTemplate/>
            }
           
        </>
    );
};

export default QuizCreateLayout;