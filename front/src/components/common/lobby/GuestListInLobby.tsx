import React, { MutableRefObject, useCallback, useEffect, useRef } from "react";
import styles from "./GuestListInLobby.module.css";
import GuestNameInLobby from "./GuestNameInLobby";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { GuestType } from "models/guest";

const GuestListInLobby: React.FC = () => {
  const scrollRef = useRef<HTMLElement>();
  const quizGuests = useSelector<RootState, GuestType[]>((state) => state.socket.guestList);

  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <>
      <div className={styles.nameGridBox} ref={scrollRef as MutableRefObject<HTMLDivElement>}>
        {quizGuests.map((item, idx) => (
          <GuestNameInLobby item={item} key={idx} />
        ))}
      </div>
    </>
  );
};

export default GuestListInLobby;
