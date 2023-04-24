import { useState } from "react";
import styles from "./QuizCreate.module.css"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
const QuizCreate: React.FC = () => {

    const [itemsList, setItemsList] = useState([
        { id: "0", content: "one", type:"퀴즈"},
        { id: "1", content: "two", type:"게임"},
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

    const addQuizHandler =()=>{
        const index = itemsList.length+1
        const newContent =  { id: index+"", content: "two", type:"퀴즈" };
        setItemsList([...itemsList, newContent]);
    }

    const addGameHandler =()=>{
        const index = itemsList.length+1
        const newContent =  { id: index+"", content: "two", type:"게임" };
        setItemsList([...itemsList, newContent]);
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

                                                <div className={styles.quiz_title}>{item.type} {index + 1}</div>
                                                <div className={styles.quiz_content}></div>

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
                우쪽
            </section>
        </div>
    );
};

export default QuizCreate;