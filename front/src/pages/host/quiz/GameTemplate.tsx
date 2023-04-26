import React from 'react';
import QuizSelectMenu from './QuizSelectMenu';
import styles from './GameTemplate.module.css'

const GameTemplate = () => {
    return (
        <>
            <QuizSelectMenu/>
            
            <div className={styles.emotion_content}>
                
                <div className={styles.emotion_title}></div>

                <div className={styles.emotion_select}></div>


            </div>

        </>
    );
};

export default GameTemplate;