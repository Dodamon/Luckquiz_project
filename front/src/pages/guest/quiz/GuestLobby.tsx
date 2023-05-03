import React from "react";
import logo from "assets/images/logo.png";
import styles from "./GuestLobby.module.css";
import LobbyComp from "components/common/lobby/LobbyComp";

const GuestLobby:React.FC = () => {
   
    return (
        <div className={styles.lobby}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="" className={styles.logo}/>
            </div>
            <LobbyComp/>
        </div>
    );
};

export default GuestLobby;