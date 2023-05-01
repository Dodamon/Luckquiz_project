import React, { useState } from 'react';
import styles from "./QuizShortTemplate.module.css"
import { Icon } from '@iconify/react';
const QuizShortTemplate = () => {

    const [answerList,setAnswerList] = useState([1]);


    const answerAddHandler =()=>{
        if(answerList.length===3) return;
        const newItem = 1;
        setAnswerList([...answerList, newItem]);
    }


    return (
        <>
            <div className={styles.content_title}>
                <input type="text" placeholder="질문을 입력하세요" />
            </div>

            <div className={styles.content_images}>
                <div className={styles.plus_font} ><div><Icon icon="ic:round-plus" /></div></div>
                <div className={styles.plus_comment}>이미지를 첨부하세요</div>
            </div>

            <div className={styles.content_answerbox}>
                        {
                            answerList.map((it,index)=>{
                                return   <div className={styles.content_answer} key={index}> <div className={styles.content_color} style={{backgroundColor:"var( --button-two)"}}><div><Icon icon="ic:round-menu" /></div></div>
                                <div className={styles.content_input}><input type="text" /></div>
                                <div className={styles.content_add} onClick={answerAddHandler}><Icon icon="ic:round-plus" /></div></div>
                            })
                        }
                       
                    

            </div>
        </>
    );
};

export default QuizShortTemplate;