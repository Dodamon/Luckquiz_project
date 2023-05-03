import React from "react";
import logo from "assets/images/logo.png";
import styles from "./GuestLobby.module.css";

const GuestLobby:React.FC = () => {

    return (
        <div>
            <img src={logo} alt="" className={styles.logo}/>
            
        </div>
    );
};

export default GuestLobby;