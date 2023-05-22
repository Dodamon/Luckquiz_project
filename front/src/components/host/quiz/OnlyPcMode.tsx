import React from "react";
import logo from "assets/images/logo.png";
import styles from "./OnlyPcMode.module.css";

const OnlyPcMode:React.FC = () => {

    return (
        <div className={styles.notification}>
            <img src={logo} alt="" className={styles.logo} />
            <hr className={styles.underline}/>
            <div className={styles.text}>
                퀴즈 출제는 PC에서만 가능합니다.
            </div>
        </div>
    )
};

export default OnlyPcMode;