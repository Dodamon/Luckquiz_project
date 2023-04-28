import React from 'react';
import QuizSelectMenu from './QuizSelectMenu';
import QuizTemplate from './QuizTemplate';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useDispatch } from 'react-redux';
import QuizOxTemplate from './QuizOxTemplate';
import QuizShortTemplate from './QuizShortTemplate';

const QuizCreateLayout = () => {
    const dispatch= useDispatch();
    const quizInfo = useSelector((state: RootState) => state.quiz);
    const selectInfo = useSelector((state: RootState) => state.auth);


    return (
        <>
            <QuizSelectMenu/>
            {
                selectInfo.quizType==="four"? <QuizTemplate/>: selectInfo.quizType==="ox"? <QuizOxTemplate/>:<QuizShortTemplate/>
            }
           
        </>
    );
};

export default QuizCreateLayout;