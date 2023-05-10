import React from 'react';
import { setQuizItem } from 'models/quiz';
import QuizShortContent from '../../../components/guest/quiz/QuizShortContent';




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


             
            {/* <QuizFourContent content={newGameItem}/> */}
            <QuizShortContent content={newGameItem}/>
        </div>
    );
};

export default QuizContent;