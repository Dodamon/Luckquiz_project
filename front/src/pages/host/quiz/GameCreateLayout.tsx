import React from 'react';
import styles from "./GameCreateLayout.module.css"
import emotion from "../../../assets/images/emotion_game.png"
import next from "../../../assets/images/next_game.png"
import pop from "../../../assets/images/pop_game.png"
import wakeup from "../../../assets/images/wakeup_game.png"
import { Icon } from '@iconify/react';
const GameCreateLayout = () => {
    return (
        <div className={styles.GameCreateLayout}>
            <div className={styles.game_content}>

                <ul className={styles.game_list}>
                    <li className={styles.game_item}>
                        <header className={styles.game_title}><h3>셀카 감정분석게임</h3></header>
                        <section className={styles.game_img} ><img src={emotion} alt="감정분석" /></section>
                        <footer className={styles.game_setting}><div className={styles.game_btnbox}>
                                <div className={styles.game_btn} style={{backgroundColor:"var( --button-two)"}}><Icon icon="akar-icons:triangle-right" /></div>
                                <div className={styles.game_btn} style={{backgroundColor:"var( --button-one)"}}><Icon icon="ic:round-plus" /></div>
                        </div>
                        </footer>
                    </li>

                    <li className={styles.game_item}>
                        <header className={styles.game_title}><h3>일어나 럭퀴야 학교가자</h3></header>
                        <section className={styles.game_img} ><img src={wakeup} alt="감정분석" /></section>
                        <footer className={styles.game_setting}><div className={styles.game_btnbox}>
                                <div className={styles.game_btn} style={{backgroundColor:"var( --button-two)"}}><Icon icon="akar-icons:triangle-right" /></div>
                                <div className={styles.game_btn} style={{backgroundColor:"var( --button-one)"}}><Icon icon="ic:round-plus" /></div>
                        </div>
                        </footer>
                    </li>

                    <li className={styles.game_item}>
                        <header className={styles.game_title}><h3>풍선 터뜨리기</h3></header>
                        <section className={styles.game_img} ><img src={wakeup} alt="감정분석" /></section>
                        <footer className={styles.game_setting}><div className={styles.game_btnbox}>
                                <div className={styles.game_btn} style={{backgroundColor:"var( --button-two)"}}><Icon icon="akar-icons:triangle-right" /></div>
                                <div className={styles.game_btn} style={{backgroundColor:"var( --button-one)"}}><Icon icon="ic:round-plus" /></div>
                        </div>
                        </footer>
                    </li>
                </ul>

                <ul className={styles.game_list}>
                    <li className={styles.game_item_etc}>


                    <header className={styles.game_title}><h4>퀴즈 준비중</h4></header>
                        <section className={styles.game_mid} >
                            <Icon icon="ic:baseline-question-mark" />
                        </section>
  

                    </li>

                    
                </ul>



            </div>
        </div>
    );
};

export default GameCreateLayout;