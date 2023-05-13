import React, { MutableRefObject, useCallback, useEffect, useRef } from "react";
import styles from "./GuestListInLobby.module.css";
import GuestNameInLobby from "./GuestNameInLobby";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { GuestType } from "models/guest";

const GuestListInLobby: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>();
  const quizGuests = useSelector((state : RootState) => state.socket.guestList);

  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  }, [scrollRef]);

  useEffect(() => {
    scrollToBottom();
  }, [quizGuests, scrollToBottom]);

  return (
    <>
      <div className={styles.nameGridBox} ref={scrollRef as MutableRefObject<HTMLDivElement>}>
        {quizGuests && quizGuests.map((item, idx) => (
          <GuestNameInLobby item={item} key={idx} />
        ))}
        <div ref={scrollRef as MutableRefObject<HTMLDivElement>} />
      </div>
    </>
  );
};

export default GuestListInLobby;
