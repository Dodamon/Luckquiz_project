import React from "react";
import logo from "assets/images/logo.png";
import styles from "./GuestLobby.module.css";
import LobbyComp from "components/common/lobby/LobbyComp";
import { useNavigate } from "react-router";

const GuestLobby:React.FC = () => {
    const navigate = useNavigate();
   const onClickNavigate = () => {
    navigate("/guest/quiz/emotion");
   }
    return (
        <div className={styles.lobby}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="" className={styles.logo}/>
                <button onClick={onClickNavigate}>
                    감정게임
                </button>
            </div>
            <LobbyComp/>
        </div>
    );
};

export default GuestLobby;