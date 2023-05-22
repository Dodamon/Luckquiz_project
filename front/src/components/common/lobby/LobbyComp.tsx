import React from "react";
import styles from "./LobbyComp.module.css";
import GuestListInLobby from "./GuestListInLobby";
import LoadingSpinner from "../LoadingSpinner";

const LobbyComp: React.FC = () => {
  return (
    <>
      <div className={styles.nameContainer}>
        <GuestListInLobby />
        <div className={styles.loadingSpinner}>
          <LoadingSpinner text="" />
        </div>
      </div>
    </>
  );
};

export default LobbyComp;
