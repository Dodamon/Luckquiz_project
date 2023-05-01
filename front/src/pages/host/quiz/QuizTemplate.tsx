import React from 'react';
import styles from "./QuizTemplate.module.css"
import { Icon } from '@iconify/react';
const QuizTemplate = () => {
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
                    <div className={styles.content_answer}>
                        <div className={styles.content_color} style={{backgroundColor:"var(--select-one)"}}><div><Icon icon="material-symbols:circle-outline" /></div></div>
                        <div className={styles.content_input}><input type="text" /></div>
                    </div>

                    <div className={styles.content_answer}>
                        <div className={styles.content_color} style={{backgroundColor:"var( --select-two)"}}><div><Icon icon="ph:triangle-bold" /></div></div>
                        <div className={styles.content_input}><input type="text" /></div>
                    </div>

                    <div className={styles.content_answer}>
                        <div className={styles.content_color} style={{backgroundColor:"var( --select-three)"}}><div><Icon icon="ph:x-bold" /></div></div>
                        <div className={styles.content_input}><input type="text" /></div>
                    </div>

                    <div className={styles.content_answer}>
                        <div className={styles.content_color} style={{backgroundColor:"var(--select-four)"}}><div><Icon icon="material-symbols:square-outline-rounded" /></div></div>
                        <div className={styles.content_input}><input type="text" /></div>
                    </div>
                </div>
        </>
    );
};

export default QuizTemplate;