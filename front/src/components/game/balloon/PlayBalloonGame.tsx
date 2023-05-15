import React from "react";
import BalloonGame from "components/game/balloon/BalloonGame";
import styles from "./PlayBalloonGame.module.css";
import logoCat from "assets/images/logoCharacter.png";

interface Props {
    handleOrder: Function;
  }
  
const PlayBalloonGame:React.FC<Props> = ({handleOrder}) => {

    return (
        <div className={styles.balloonGameContainer}>
            <img src={logoCat} alt="" className={styles.logoCatImg}/>
            <div className={styles.gameTitle}>
                풍선 터트리기 게임 
            </div>
            <BalloonGame handleOrder={handleOrder}/> 
        </div>  
    );
};

export default PlayBalloonGame; 