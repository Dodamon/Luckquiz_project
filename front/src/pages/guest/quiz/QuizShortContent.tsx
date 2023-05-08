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
                <img src={"data:image/jpeg;base64,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"} alt='좋아' />
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