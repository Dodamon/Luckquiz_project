import { useState } from "react";
import styles from "./QuizCreatePage.module.css"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

import QuizCreateLayout from "./QuizCreateLayout";
import GameCreateLayout from "./GameCreateLayout";

const QuizCreatePage: React.FC = () => {

    const [itemsList, setItemsList] = useState([
        { id: "0", content: "one", type: "퀴즈" },
        { id: "1", content: "two", type: "게임" },
    ]);

    function onDragEnd(result: any) {
        if (!result.destination) {
            return;
        }
        const items = Array.from(itemsList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setItemsList(items);
    }

    const addQuizHandler = () => {
        const index = itemsList.length + 1
        const newContent = { id: index + "", content: "two", type: "퀴즈" };
        setItemsList([...itemsList, newContent]);
    }

    const addGameHandler = () => {
        const index = itemsList.length + 1
        const newContent = { id: index + "", content: "two", type: "게임" };
        setItemsList([...itemsList, newContent]);
    }

    const deleteContentHandler = (idx: string) => {
        const newQuizList = itemsList.filter(it => it.id !== idx + "")
        setItemsList(newQuizList);
    }


    return (
        <div className={styles.QuizCreate}>
            <section className={styles.left_side} >
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="one">

                        {(provided) => (
                            <ul className={styles.quiz_list} ref={provided.innerRef} {...provided.droppableProps}>
                                {itemsList.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided) => (
                                            <li className={styles.quiz_item}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div className={styles.quiz_sub}>
                                                    <div className={styles.quiz_title} style={item.type === "퀴즈" ? { backgroundColor: `var(--point-color)` } : { backgroundColor: `var(--button-two)`  }}>{item.type} {index + 1}</div>
                                                    <div className={styles.quiz_delete} onClick={() => deleteContentHandler(item.id)}>x</div>
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