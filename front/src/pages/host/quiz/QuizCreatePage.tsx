import { useState, useEffect } from "react";
import styles from "./QuizCreatePage.module.css"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

import QuizCreateLayout from "./QuizCreateLayout";
import GameCreateLayout from "./GameCreateLayout";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useDispatch } from "react-redux";
import { quizAtions } from "store/quiz";
import { setQuizItem } from "models/quiz";


const newQuizItem :setQuizItem ={
    quizType:"퀴즈",
    quiz: "",
    quizUrl: "",
    answer: "",
    one: "",
    two:"",
    three: "",
    four: "",
    answerList: [],
    game: "",
    timer: 0
} 

const newGameItem :setQuizItem ={
    quizType:"게임",
    quiz: "",
    quizUrl: "",
    answer: "",
    one: "",
    two:"",
    three: "",
    four: "",
    answerList: [],
    game: "",
    timer: 0
} 

const QuizCreatePage: React.FC = () => {
    const quizInfo = useSelector((state:RootState)=> state.quiz);
    const dispatch = useDispatch();
    console.log(quizInfo.quizList);
    
    function onDragEnd(result: any) {
        if (!result.destination) {
            return;
        }
        const items = Array.from(quizInfo.quizList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
      } 
    useEffect(() => {
        
      }, [quizInfo.quizList]); 
    

  

    const addQuizHandler = () => {
        dispatch(quizAtions.addQuiz(newQuizItem))
    }

    const addGameHandler = () => {
        dispatch(quizAtions.addQuiz(newGameItem))
    }

    const deleteContentHandler = (idx: number) => {
        dispatch(quizAtions.removeQuiz(idx))
    }


    return (
        <div className={styles.QuizCreate}>
            <section className={styles.left_side} >
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="one">

                        {(provided) => (
                            <ul className={styles.quiz_list} ref={provided.innerRef} {...provided.droppableProps}>
                                {quizInfo.quizList.map((item, index) => (
                                    <Draggable key={index} draggableId={index.toString()} index={index}>
                                        {(provided) => (
                                            <li className={styles.quiz_item}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div className={styles.quiz_sub}>
                                                    <div className={styles.quiz_title} style={item.quizType === "퀴즈" ? { backgroundColor: `var(--point-color)` } : { backgroundColor: `var(--button-two)`  }}>{item.quizType} {index + 1}</div>
                                                    <div className={styles.quiz_delete} onClick={() => deleteContentHandler(index)}>x</div>
                                                </div>
                                                <div className={styles.quiz_content}>



                                                </div>

                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                <li className={styles.quiz_add}>
                                    <button className={styles.game_add_btn} onClick={addQuizHandler}>퀴즈추가</button>
                                    <button className={styles.quiz_add_btn} onClick={addGameHandler}>게임추가</button>
                                </li>
                            </ul>
                        )}

                    </Droppable>
                </DragDropContext>
            </section>

            <section className={styles.right_side} >
                      <GameCreateLayout/>   
            </section>
        </div>
    );
};

export default QuizCreatePage;