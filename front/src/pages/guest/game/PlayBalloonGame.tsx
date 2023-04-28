import React from "react";
import BalloonGame from "components/game/BalloonGame";
import styles from "./PlayBalloonGame.module.css";
import logoCat from "assets/images/logoCharacter.png";

const PlayBalloonGame:React.FC = () => {

    return (
        <div className={styles.balloonGameContainer}>
            <img src={logoCat} alt="" className={styles.logoCatImg}/>
            <div className={styles.gameTitle}>
                풍선 터트리기 게임 
            </div>
            <BalloonGame/> 
        </div>  
    );
};

export default PlayBalloonGame; 