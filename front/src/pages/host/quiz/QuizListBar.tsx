import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import styles from "./QuizListBar.module.css"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { quizAtions } from "store/quiz";
import { setQuizItem } from "models/quiz";
import { authActions } from 'store/auth';
import ox from '../../../assets/images/ox.png';
import four from '../../../assets/images/four.png';
import text from '../../../assets/images/text.png';
import game from '../../../assets/images/game.png';

const newQuizItem: setQuizItem = {
    id: 0,
    type: "quiz",
    quiz: "four",
    quizUrl: "",
    answer: "",
    question: "",
    one: "",
    two: "",
    three: "",
    four: "",
    answerList: [""],
    game: "",
    timer: 15,
    isValid: false,
}

const newGameItem: setQuizItem = {
    id: 0,
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
    timer: 15,
    isValid: false,
}


const QuizListBar = () => {

    const quizInfo = useSelector((state: RootState) => state.quiz);
    const dispatch = useDispatch();
    const [focusedItem, setFocusedItem] = useState(0);

    const itemSelectHandler = (quiznum: number) => {
        console.log("사람살려", quiznum);

        dispatch(authActions.selectIndex(quiznum));
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
        dispatch(authActions.selectIndex(result.destination.index));
        dispatch(quizAtions.locationUpdate(items))
    }


    const addQuizHandler = () => {
        if (quizInfo.quizList.length === 15) {
            alert("퀴즈 한도인 15개를 이미 추가하셨습니다.")
            return;
        }
        dispatch(quizAtions.addQuiz(newQuizItem));
    }

    const addGameHandler = () => {
        if (quizInfo.quizList.length === 15) {
            alert("퀴즈 한도인 15개를 이미 추가하셨습니다.")
            return;
        }
        dispatch(quizAtions.addQuiz(newGameItem))
    }

    const deleteContentHandler = (idx: number) => {
        if (focusedItem >= idx && focusedItem !== 0) {
            dispatch(authActions.selectIndex(focusedItem - 1));
            setFocusedItem(focusedItem - 1);
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
                                                <div className={styles.quiz_title} style={item.type === "quiz" ? { backgroundColor: `var(--point-color)` } : { backgroundColor: `var(--button-two)` }}>{item.type} {index + 1}</div>
                                                <div className={styles.quiz_delete} onClick={() => deleteContentHandler(index)}>x</div>
                                            </div>
                                            <div className={styles.quiz_content} style={index === focusedItem ? { backgroundColor: "var(--select-four)" } : {}} onClick={() => itemSelectHandler(index)}>
                                                {
                                                    item.type === "game" ? <img src={game} alt="contents" /> : item.quiz === "four" ? <img src={four} alt="contents" /> :
                                                        item.quiz === "ox" ? <img src={ox} alt="contents" /> : item.quiz === "text" ? <img src={text} alt="contents" /> : <></>
                                                }


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