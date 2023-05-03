import React from "react";
import logo from "assets/images/logo.png";
import styles from "./GuestLobby.module.css";
import GuestNameInLobby from "components/common/GuestNameInLobby";

const GuestLobby:React.FC = () => {
    // 웹소켓에서 guest 들 불러옴
    const quizGuests = [{name: "예징가나다라", img: 1}, {name: "유쥥", img: 2}, {name: "웡철", img: 3}, {name: "료황", img: 10}, {name: "동긍", img: 11}, {name: "예응", img: 12}, {name: "서노", img: 16},{name: "예징", img: 1}, {name: "유쥥", img: 2}, {name: "웡철", img: 3}, {name: "료황", img: 10}, {name: "동긍", img: 11}, {name: "예응", img: 12}, {name: "서노", img: 16},{name: "예징", img: 1}, {name: "유쥥", img: 2}, {name: "웡철", img: 3}, {name: "료황", img: 10}, {name: "동긍", img: 11}, {name: "예응", img: 12}, {name: "서노", img: 16},{name: "예징", img: 1}, {name: "유쥥", img: 2}, {name: "웡철", img: 3}, {name: "료황", img: 10}, {name: "동긍", img: 11}, {name: "예응", img: 12}, {name: "서노", img: 16},{name: "예징", img: 1}, {name: "유쥥", img: 2}, {name: "웡철", img: 3}, {name: "료황", img: 10}, {name: "동긍", img: 11}, {name: "예응", img: 12}, {name: "서노", img: 16},{name: "예징", img: 1}, {name: "유쥥", img: 2}, {name: "웡철", img: 3}, {name: "료황", img: 10}, {name: "동긍", img: 11}, {name: "예응", img: 12}, {name: "서노", img: 16}]
    
    return (
        <div className={styles.lobby}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="" className={styles.logo}/>
            </div>
            <div className={styles.nameContainer}>
                {quizGuests.map((item, idx) => <GuestNameInLobby item={item} key={idx} />)}
            </div>
        </div>
    );
};

export default GuestLobby;