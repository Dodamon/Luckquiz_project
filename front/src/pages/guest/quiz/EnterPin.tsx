import React, { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "assets/images/logo.png";
import styles from "./EnterPin.module.css";

const EnterPin: React.FC = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredPin = inputRef.current!.value;
    if (enteredPin.length === 0) {
      alert("핀 번호를 입력하세요.")
      inputRef.current?.focus();
      return
    } 
    // else if (enteredPin !== "들어가야 할 핀번호") { alert("올바른 핀 번호를 입력하세요.") inputRef.current?.focus(); return}

    navigate("/guest/nickname");
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="" className={styles.logo} />
      <form onSubmit={formSubmitHandler} className={styles.formBox}>
        <input type="text" ref={inputRef} className={styles.inputBox} placeholder="핀 번호를 입력하세요." />
        <button className={styles.enterBtn}>참여하기</button>
      </form>
    </div>
  );
};

export default EnterPin;
