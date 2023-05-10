import React from 'react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import styles from "./QuizShortContent.module.css"
import { setQuizItem } from 'models/quiz';

type QuizShortContentProps = {
    content: setQuizItem;
}


const QuizShortContent= ({ content }: QuizShortContentProps)  => {
    const [item, setItem] = useState("");

    const answerHandler = (e: any) => {
      setItem(e.target.value)
    }
    return (
        <div className={styles.QuizShortContent}>
            
            <div className={styles.content_title}>
                <input type="text" disabled value={"문제입니다"}/>
            </div>

            <div className={styles.content_images}>
                <img src={"https://image.hmall.com/static/0/0/32/88/2088320002_1.jpg?RS=600x600&AR=0"} alt='좋아' />
            </div>

            <div className={styles.content_answerbox}>
            <div className={styles.content_answer}> <div className={styles.content_color} style={{ backgroundColor: "var( --button-two)" }}><div><Icon icon="ic:round-menu" /></div></div>
              <div className={styles.content_input}>
                <input type="text" value={item} onChange={(e)=>answerHandler(e)}/>
                </div>
             </div>
             <div className={styles.content_submitbox}>
                <div className={styles.content_submit}>
                   
                   <div>제출</div> 
                    </div>
             </div>

            </div>


        </div>
    );
};

export default QuizShortContent;