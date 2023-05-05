import React, { useState } from 'react';
import styles from "./GameEmotionTemplate.module.css"
import emotions from '../../../assets/images/emotion_game.png'
import { Icon } from '@iconify/react';
const GameEmotionTemplate = () => {

    const [emotion, setEmotion] = useState("");





    const emotionSelectHandler = (item: string) => {
        setEmotion(item);
    }





    return (
        <>
            <div className={styles.emotion_content}>

                <div className={styles.emotion_intro}>
                    <div className={styles.intro_img}><img src={emotions} alt="" /></div>
                    <div className={styles.intro_explain}>
                        <h3>셀카 감정 분석게임</h3>
                        <div className={styles.intro_comment}>상단 메뉴에서 게임이 진행될 시간을 선택하고,
                            하단 메뉴에서 미션으로 제시할 감정을 선택하세요.</div>
                    </div>
                </div>

                <div className={styles.emotion_select}>

                    <ul className={styles.emotion_grid}>
                        <li onClick={() => emotionSelectHandler("happy")} style={emotion === 'happy' ? { opacity: "70%" } : {}}>
                            <div className={styles.emotion_box} style={{ backgroundColor: "var(--select-two)" }} ><Icon icon="ri:emotion-line" /></div>
                            <div className={styles.emotion_ment}>기쁨</div>
                        </li>

                        <li onClick={() => emotionSelectHandler("sad")} style={emotion === 'sad' ? { opacity: "70%" } : {}}>
                            <div className={styles.emotion_box} style={{ backgroundColor: "var(--select-four)" }} ><Icon icon="ri:emotion-sad-line" /></div>
                            <div className={styles.emotion_ment}>슬픔</div>
                        </li>

                        <li onClick={() => emotionSelectHandler("scared")} style={emotion === 'scared' ? { opacity: "70%" } : {}}>
                            <div className={styles.emotion_box} style={{ backgroundColor: "var(--select-three)" }}><Icon icon="ri:emotion-2-line" /></div>
                            <div className={styles.emotion_ment}>두려움</div>
                        </li>

                        <li onClick={() => emotionSelectHandler("angry")} style={emotion === 'angry' ? { opacity: "70%" } : {}}>
                            <div className={styles.emotion_box} style={{ backgroundColor: "var( --select-one)" }}><Icon icon="ri:emotion-unhappy-line" /></div>
                            <div className={styles.emotion_ment}>분노</div>
                        </li>

                        <li onClick={() => emotionSelectHandler("aversion")} style={emotion === 'aversion' ? { opacity: "70%" } : {}}>
                            <div className={styles.emotion_box} ><Icon icon="ri:emotion-laugh-line" /></div>
                            <div className={styles.emotion_ment}>혐오</div>
                        </li>



                    </ul>






                </div>


            </div>

        </>
    );
};

export default GameEmotionTemplate;