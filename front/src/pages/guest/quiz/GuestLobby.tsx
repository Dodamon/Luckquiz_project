import React, { useEffect } from "react";
import logo from "assets/images/logo.png";
import styles from "./GuestLobby.module.css";
import LobbyComp from "components/common/lobby/LobbyComp";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { GuestType } from "models/guest";
import { useNavigate } from "react-router";

const GuestLobby: React.FC = () => {
  const navigate = useNavigate();
  const quizItem = useSelector((state: RootState) => state.socket.quizItem);
  const guestList = useSelector<RootState, GuestType[]|null>((state) => state.socket.guestList);
  
  useEffect(() => {
    console.log("바뀐", guestList);
  }, [guestList]);

  useEffect(() => {
    quizItem && navigate(`/guest/quiz/play`);
  }, [navigate, quizItem]);

  return (
    <div className={styles.lobby}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="" className={styles.logo} />
      </div>
      <LobbyComp />
    </div>
  );
};

export default GuestLobby;
