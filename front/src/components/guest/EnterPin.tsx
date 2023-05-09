import React, { FormEvent, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "assets/images/logo.png";
import styles from "./EnterPin.module.css";
import { socketActions } from "store/webSocket";
import { RootState } from "store";
import { Client } from "@stomp/stompjs";

const EnterPin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const client = useSelector<RootState, Client>((state) => state.socket.client);

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredPin = inputRef.current!.value;
    if (enteredPin.length === 0) {
      alert("핀 번호를 입력하세요.");
      inputRef.current?.focus();
      return;
    }
    // else if (enteredPin !== "들어가야 할 핀번호") { alert("올바른 핀 번호를 입력하세요.") inputRef.current?.focus(); return}
    if (!client.connected) dispatch(socketActions.connect());
    navigate("/guest/nickname");
  };

  return (
    <div className={styles.containerWrapper}>
      <img src={logo} alt="" className={styles.logo} />
      <div className={styles.container}>
        <form onSubmit={formSubmitHandler} className={styles.formBox}>
          <div className={styles.enterTxt}>퀴즈 참여하러 가기</div>
          <hr className={styles.border}/>
          <input type="text" ref={inputRef} className={styles.inputBox} placeholder="핀 번호를 입력하세요." />
          <button className={styles.enterBtn}>참여하기</button>
        </form>
      </div>
    </div>
  );
};

export default EnterPin;
