import React, { useState, useRef, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { Icon } from "@iconify/react";
import styles from "./ProfileNickname.module.css";
import img1 from "assets/profile/profile1.png";
import img2 from "assets/profile/profile2.png";
import img3 from "assets/profile/profile3.png";
import img4 from "assets/profile/profile4.png";
import img5 from "assets/profile/profile5.png";
import img6 from "assets/profile/profile6.png";
import img7 from "assets/profile/profile7.png";
import img8 from "assets/profile/profile8.png";
import img9 from "assets/profile/profile9.png";
import img10 from "assets/profile/profile10.png";
import img11 from "assets/profile/profile11.png";
import img12 from "assets/profile/profile12.png";
import img13 from "assets/profile/profile13.png";
import img14 from "assets/profile/profile14.png";
import img15 from "assets/profile/profile15.png";
import img16 from "assets/profile/profile16.png";
import { guestActions } from "store/guest";

const ProfileNickname: React.FC = () => {
  const IMAGES = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16];
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 
  const nicknameRef = useRef<HTMLInputElement>(null);
  const imgIdx = useSelector<RootState, number>((state) => state.guest.image);

  // 프로필 사진 수정
  const onClickEditImg = () => {
    navigate('/guest/profile', { state: imgIdx });
  };

  // 참여하기 눌렀을 때 프로필사진 닉네임 설정, 대기 화면으로 가기
  const onClickSubmit = () => {
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

    dispatch(guestActions.updateGuestNickname(enteredTxt));
    // 닉네임, 프로필 사진 POST
    //////////////////////////
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
          <img src={IMAGES[imgIdx]} alt="" className={styles.guestProfileImg} />
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
