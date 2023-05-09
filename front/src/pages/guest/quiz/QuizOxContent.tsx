import React from 'react';
import { Icon } from '@iconify/react';
import { useState } from 'react';



import styles from "./QuizOxContent.module.css"
import { setQuizItem } from 'models/quiz';

type QuizOxContentProps = {
    content: setQuizItem;
}


const QuizOxContent= ({ content }: QuizOxContentProps)  => {
    const [item, setItem] = useState("");

    const answerHandler = (answer: string) => {
      setItem(answer);
    }
    return (
        <div className={styles.QuizOxContent}>
            
            <div className={styles.content_title}>
                <input type="text" disabled value={"문제입니다"}/>
            </div>

            <div className={styles.content_images}>
                <img src={"https://image.hmall.com/static/0/0/32/88/2088320002_1.jpg?RS=600x600&AR=0"} alt='좋아' />
            </div>

            <div className={styles.content_answerbox}>
                <div className={styles.content_answer} onClick={() => answerHandler('one')} style={item === 'one' ? { opacity: "70%" } : {}}>
                    <div className={styles.content_color} style={{ backgroundColor: "var(--select-two)" }}><div><Icon icon="material-symbols:circle-outline" /></div></div>
                    <div className={styles.content_input}><input type="text"  disabled value={"맞다"} /></div>
                </div>

                <div className={styles.content_answer} onClick={() => answerHandler('two')} style={item === 'two' ? { opacity: "70%" } : {}}>
                    <div className={styles.content_color} style={{ backgroundColor: "var( --select-one)" }}><div><Icon icon="ph:x-bold" /></div></div>
                    <div className={styles.content_input}><input type="text" disabled value={"아니다"}  /></div>
                </div>

            </div>


        </div>
    );
};

export default QuizOxContent;