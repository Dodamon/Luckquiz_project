import React from 'react';
import styles from './GameWakeupTemplate.module.css'
import pop from '../../../assets/images/pop_game.png'
const GameBalloonTemplate = () => {
    return (
        <>
            <div className={styles.shake_content}>
                <div className={styles.shake_title}>
                    <h1>풍선 터뜨리기</h1>
                    <div className={styles.shake_explain}>상단 메뉴에서 게임이 진행될 시간을 선택하세요</div>
                </div>
                <div className={styles.shake_img}><img src={pop} alt="balloon" /></div>
            </div>
        </>
    );
};

export default GameBalloonTemplate;