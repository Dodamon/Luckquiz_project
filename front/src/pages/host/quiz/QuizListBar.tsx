import {useState} from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import styles from "./QuizListBar.module.css"
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "store";
import { quizAtions } from "store/quiz";
import { setQuizItem } from "models/quiz";
import { authAtions } from 'store/auth';

const newQuizItem: setQuizItem = {
    id:0,
    quizType: "퀴즈",
    quiz: "four",
    quizUrl: "",
    answer: "",
    question:"",
    one: "",
    two: "",
    three: "",
    four: "",
    answerList: [],
    game: "",
    timer: 15
}

const newGameItem: setQuizItem = {
    id:0,
    quizType: "게임",
    quiz: "",
    quizUrl: "",
    answer: "",
    one: "",
    question:"",
    two: "",
    three: "",
    four: "",
    answerList: [],
    game: "",
    timer: 15
}


const QuizListBar = () => {

    const quizInfo = useSelector((state: RootState) => state.quiz);
    const dispatch = useDispatch();
    const [focusedItem, setFocusedItem]= useState(0);

    const itemSelectHandler = (quiznum: number)=>{
        dispatch(authAtions.selectIndex(quiznum));
        setFocusedItem(quiznum);
    }

    const onDragEnd = (result: any) => {
        if (!result.destination) { 
            return;
        }
        const items = Array.from(quizInfo.quizList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setFocusedItem(result.destination.index);
        dispatch(authAtions.selectIndex(result.destination.index));
        dispatch(quizAtions.locationUpdate(items))
    }


    const addQuizHandler = () => {
        dispatch(quizAtions.addQuiz(newQuizItem));
    }

    const addGameHandler = () => {
        dispatch(quizAtions.addQuiz(newGameItem))
    }

    const deleteContentHandler = (idx: number) => {
        if(focusedItem>=idx && focusedItem!==0){
            dispatch(authAtions.selectIndex(focusedItem-1));
            setFocusedItem(focusedItem-1);
        }
        dispatch(quizAtions.removeQuiz(idx));
    }

    return (
        <>
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
                                                    <div className={styles.quiz_title} style={item.quizType === "퀴즈" ? { backgroundColor: `var(--point-color)` } : { backgroundColor: `var(--button-two)` }}>{item.quizType} {index + 1}</div>
                                                    <div className={styles.quiz_delete} onClick={() => deleteContentHandler(index)}>x</div>
                                                </div>
                                                <div className={styles.quiz_content} style={index===focusedItem?{backgroundColor:"var(--select-four)"}:{} } onClick={()=>itemSelectHandler(index)}>

            
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
        </>
    );
};

export default QuizListBar;