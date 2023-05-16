import React from 'react';
import styles from "./GameSelection.module.css"
import emotion from "../../../assets/images/emotion_game.png"
import next from "../../../assets/images/next_game.png"
import pop from "../../../assets/images/pop_game.png"
import wakeup from "../../../assets/images/wakeup_game.png"
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useDispatch } from 'react-redux';
import { quizAtions } from 'store/quiz';

const GameSelection = () => {
    const selectInfo = useSelector((state: RootState) => state.auth.choiceIndex);
    const dispatch = useDispatch();

    const gameSelectHandler = (gameType: string) => {
        dispatch(quizAtions.gameTypeUpdate({ index: selectInfo, gameType: gameType }));
    }



    return (
        <>
            <div className={styles.game_content}>

                <ul className={styles.game_list}>
                    <li className={styles.game_item} onClick={() => gameSelectHandler("emotion")}>
                        <header className={styles.game_title}>셀카 감정분석게임</header>
                        <section className={styles.game_img} ><img src={emotion} alt="감정분석" /></section>
                        <footer className={styles.game_setting}><div className={styles.game_btnbox}>
                            <div className={styles.game_btn} style={{ backgroundColor: "var( --button-two)" }}><Icon icon="akar-icons:triangle-right" /></div>
                            <div className={styles.game_btn} style={{ backgroundColor: "var( --button-one)" }}><Icon icon="ic:round-plus" /></div>
                        </div>
                        </footer>
                    </li>

                    <li className={styles.game_item} onClick={() => gameSelectHandler("wakeup")}>
                        <header className={styles.game_title} >일어나 럭퀴야 학교가자</header>
                        <section className={styles.game_img} ><img src={wakeup} alt="감정분석" /></section>
                        <footer className={styles.game_setting}><div className={styles.game_btnbox}>
                            <div className={styles.game_btn} style={{ backgroundColor: "var( --button-two)" }}><Icon icon="akar-icons:triangle-right" /></div>
                            <div className={styles.game_btn} style={{ backgroundColor: "var( --button-one)" }}><Icon icon="ic:round-plus" /></div>
                        </div>
                        </footer>
                    </li>

                    <li className={styles.game_item} onClick={() => gameSelectHandler("balloon")}>
                        <header className={styles.game_title}>풍선 터뜨리기</header>
                        <section className={styles.game_img} ><img src={pop} alt="감정분석" /></section>
                        <footer className={styles.game_setting}><div className={styles.game_btnbox}>
                            <div className={styles.game_btn} style={{ backgroundColor: "var( --button-two)" }}><Icon icon="akar-icons:triangle-right" /></div>
                            <div className={styles.game_btn} style={{ backgroundColor: "var( --button-one)" }}><Icon icon="ic:round-plus" /></div>
                        </div>
                        </footer>
                    </li>
                </ul>

                <ul className={styles.game_list}>
                    <li className={styles.game_item_etc}>


                        <header className={styles.game_title}><h5>퀴즈 준비중</h5></header>
                        <section className={styles.game_mid} >
                            <Icon icon="ic:baseline-question-mark" />
                        </section>


                    </li>


                </ul>



            </div>
        </>
    );
};

export default GameSelection;