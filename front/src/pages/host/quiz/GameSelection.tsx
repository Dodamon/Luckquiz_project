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
import { useNavigate } from 'react-router';


const GameSelection = () => {
    const selectInfo = useSelector((state: RootState) => state.auth.choiceIndex);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const gameSelectHandler = (gameType: string) => {
        dispatch(quizAtions.gameTypeUpdate({ index: selectInfo, gameType: gameType }));
    }



    return (
        <>
            <div className={styles.game_content}>

                <div className={styles.main_title}>
                    <div className={styles.main_ment}>GAME WORLD</div>
                 
                    </div>

                <ul className={styles.game_list}>
                    <li className={styles.game_item} style={{backgroundColor:"var(--select-four)"}} >
                        <header className={styles.game_title}>셀카 감정분석게임</header>
                        <section className={styles.game_img} ><img src={emotion} alt="감정분석" style={{objectFit:"fill"}} /></section>
                        <footer className={styles.game_setting}><div className={styles.game_btnbox}>
                            {/* <div className={styles.game_btn} style={{ backgroundColor: "var( --button-two)" }}><Icon icon="akar-icons:triangle-right" /></div> */}
                            <div className={styles.game_btn} style={{ backgroundColor: "skyblue" }} onClick={() => gameSelectHandler("emotion")}><Icon icon="ic:round-plus" /></div>
                        </div>
                        </footer>
                    </li>

                    <li className={styles.game_item} style={{backgroundColor:"var(--select-three)"}} >
                        <header className={styles.game_title} >일어나 럭퀴야 학교가자</header>
                        <section className={styles.game_img} ><img src={wakeup} alt="감정분석"  style={{objectFit:"fill"}}/></section>
                        <footer className={styles.game_setting}><div className={styles.game_btnbox}>
                            {/* <div className={styles.game_btn} style={{ backgroundColor: "var( --button-two)" }}><Icon icon="akar-icons:triangle-right" /></div> */}
                            <div className={styles.game_btn} style={{ backgroundColor: "var(--select-one" }} onClick={() => gameSelectHandler("wakeup")}><Icon icon="ic:round-plus" /></div>
                        </div>
                        </footer>
                    </li>

                    <li className={styles.game_item} style={{backgroundColor:"var(--select-one)"}} >
                        <header className={styles.game_title}>풍선 터뜨리기</header>
                        <section className={styles.game_img} ><img src={pop} alt="감정분석" style={{objectFit:"fill"}} /></section>
                        <footer className={styles.game_setting}><div className={styles.game_btnbox}>
                            {/* <div className={styles.game_btn} style={{ backgroundColor: "var( --button-two)" }}><Icon icon="akar-icons:triangle-right" /></div> */}
                            <div className={styles.game_btn} style={{ backgroundColor: "var(--select-three)" }} onClick={() => gameSelectHandler("balloon")}><Icon icon="ic:round-plus" /></div>
                        </div>
                        </footer>
                    </li>
                </ul>

     

                <div className={styles.exitbox}>
                <div className={styles.exit_btn} >
                    <div className={styles.btn_comment} onClick={()=>  navigate("/home",{replace: true})}>나가기</div>
                    
                </div>
                </div>

            </div>
        </>
    );
};

export default GameSelection;