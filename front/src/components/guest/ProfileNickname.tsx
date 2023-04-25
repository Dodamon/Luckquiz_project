import React, { useRef, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import styles from "./ProfileNickname.module.css";
import chihiro from "assets/images/chihiro.jpg";

const ProfileNickname: React.FC = () => {
  const navigate = useNavigate();  
  const nicknameRef = useRef<HTMLInputElement>(null);

  // 프로필 사진 수정
  const onClickEditImg = () => {
    navigate('/guest/profile');
  };

  // 참여하기 눌렀을 때 프로필사진 닉네임 설정, 대기 화면으로 가기
  const onClickSubmit = () => {
    // 닉네임, 프로필 사진 POST
    //////////////////////////
    const enteredTxt = nicknameRef.current!.value;
    if (enteredTxt.length === 0) {
      alert("닉네임을 입력하세요.")
      nicknameRef.current?.focus();
      return
    } else if (enteredTxt.length > 6) {
      alert("닉네임은 6자 이하로 작성하세요.");
      nicknameRef.current!.value = "";
      nicknameRef.current?.focus();
      return
    };
    nicknameRef.current?.blur();

    navigate('/guest/quiz/lobby');
  };

  const enterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
  
    if (e.key === "Enter") {
      const enteredTxt = nicknameRef.current!.value;
      if (enteredTxt.length > 6) {
        alert("닉네임은 6자 이하로 작성하세요.");
        nicknameRef.current!.value = "";
        nicknameRef.current?.focus();
      };
      nicknameRef.current!.blur();
    };
  };

  return (
    <div className={styles.profileNicknameContainer}>
      <div className={styles.imgWrapper}>
        <div className={styles.profileImgMiddler}>
          <img src={chihiro} alt="" className={styles.guestProfileImg} />
          <Icon icon="ph:plus-circle-fill" className={styles.imgEditBtn} onClick={onClickEditImg} />
        </div>
      </div>
      <div className={styles.nicknameWrapper} >
        <input className={styles.nicknameInput} type="text" ref={nicknameRef} placeholder="닉네임을 입력하세요" onKeyDown={enterHandler}/>
      </div>
      <div className={styles.nicknameWrapper}>
        <div className={styles.startBtn} onClick={onClickSubmit}>
          참여하기
        </div>
      </div>
    </div>
  );
};

export default ProfileNickname;
