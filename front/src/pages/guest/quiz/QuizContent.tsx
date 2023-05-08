import React from 'react';
import QuizFourContent from './QuizFourContent';
import { setQuizItem } from 'models/quiz';
import QuizShortContent from './QuizShortContent';
import QuizOxContent from './QuizOxContent';



const QuizContent = () => {
    const newGameItem: setQuizItem = {

        type: "game",
        quiz: "",
        quizUrl: "",
        answer: "",
        one: "",
        question: "",
        two: "",
        three: "",
        four: "",
        answerList: [],
        game: "",
        timer: 15
    }
    
    return (
        <div>
            <QuizFourContent content={newGameItem}/>
            
            {/* <QuizShortContent content={newGameItem}/> */}
        </div>
    );
};

export default QuizContent;