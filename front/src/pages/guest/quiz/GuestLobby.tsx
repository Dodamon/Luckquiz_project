import React from "react";
import logo from "assets/images/logo.png";
import styles from "./GuestLobby.module.css";
import GuestNameInLobby from "components/common/GuestNameInLobby";

const GuestLobby:React.FC = () => {
    // 웹소켓에서 guest 들 불러옴
    // const quizGuests = [{name: "예징", img: 1}, {name: "유징", img: "img2"}, {name: "웡철", img: "img3"}, {name: "료황", img: "img4"}, {name: "동귱", img: "img5"}, {name: "예응", img: "img6"}, {name: "서노", img: "img7"}]
    const quizGuests = [{name: "예징", img: 1}]
    return (
        <div className={styles.lobby}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="" className={styles.logo}/>
            </div>
            <div className={styles.nameContainer}>
                {quizGuests.map((item) => <GuestNameInLobby item={item}/>)}
            </div>
        </div>
    );
};

export default GuestLobby;