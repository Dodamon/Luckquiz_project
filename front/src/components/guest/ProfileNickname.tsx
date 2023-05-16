import React, { useRef, KeyboardEvent, useEffect, useState } from "react";
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
import { connectAndSubscribe, socketActions } from "store/webSocket";
import useGuestAxios from "hooks/useGuestAxios";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation } from "react-router-dom";

const ProfileNickname: React.FC = () => {

  const IMAGES = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14,
    img15,
    img16,
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const imgIdx = useSelector<RootState, number>((state) => state.guest.image);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const pinNum = useSelector<RootState, string>((state) => state.socket.pinNum);
  const guestName = useSelector<RootState, string>((state) => state.guest.nickname);
  const gotMessage = useSelector<RootState, boolean>((state) => state.socket.getMessage);
  const { data, status, isLoading, sendGuestRequest } = useGuestAxios();
  const [useOk, setUseOk] = useState(false);
  const [nameLoading, setNameLoading] = useState(false);
  const [paramPin, setParamPin] = useState(pinNum);

  // 프로필 사진 수정
  const onClickEditImg = () => {
    navigate("/guest/profile", { state: {imgIdx: imgIdx, pinNum: paramPin} });
  };

  // 참여하기 눌렀을 때 프로필사진 닉네임 설정, 웹소켓 연결, 대기화면으로 navigate
  const onClickSubmit = async () => {
    // 닉네임 유효성 검사
    const enteredTxt = nicknameRef.current!.value;
    if (enteredTxt.length === 0) {
      alert("닉네임을 입력하세요.");
      nicknameRef.current?.focus();
      return;
    } else if (enteredTxt.length > 6) {
      alert("닉네임은 6자 이하로 작성하세요.");
      nicknameRef.current!.value = "";
      nicknameRef.current?.focus();
      return;
    }
    nicknameRef.current?.blur();
    dispatch(guestActions.updateGuestNickname(enteredTxt));

    // websocket subscribe, publish
    const socketProps = {
      name: guestName,
      img: imgIdx,
      roomNum: paramPin,
      isHost: false,
    };

    if (!isLoading && useOk) connectAndSubscribe(socketProps, dispatch);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredTxt = e.target.value;
    if (enteredTxt.length > 6) {
      alert("닉네임은 6자 이하로 작성하세요.");
      nicknameRef.current!.value = "";
      nicknameRef.current?.focus();
    }
    dispatch(guestActions.updateGuestNickname(enteredTxt));
  };

  useEffect(() => {
    if (guestName.length === 0) return;
    setNameLoading(true);
    const identifier = setTimeout(() => {
      // keyup 1초 후 중복 검사
      console.log("api 요청");
      sendGuestRequest({ url: `/api/quizroom/duplicate/${paramPin}/${guestName}` });
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [paramPin, guestName]);

  useEffect(() => {
    if (isLoading) return;
    if (!status || status !== 200) return;
    setNameLoading(false);
  }, [status, isLoading]);

  useEffect(() => {
    if (data === true) setUseOk(true);
    else if (data === false) setUseOk(false);
  }, [data]);

  useEffect(() => {
    setNameLoading(false);
  
    const queryString = location.search;
    const searchParams = new URLSearchParams(queryString);
    const value = searchParams.get("pinnum");
    console.log("params: ", value);
    if (typeof value === "string") setParamPin(value);

    if (guestName.length > 0 ) {
      nicknameRef.current!.value = guestName;
      nicknameRef.current?.focus();
    } 
  }, []);

  useEffect(() => {
    if (gotMessage) navigate("/guest/quiz/lobby");
  }, [gotMessage]);

  return (
    <div className={styles.profileNicknameContainer}>
      <div className={styles.imgWrapper}>
        <div className={styles.profileImgMiddler}>
          <img src={IMAGES[imgIdx]} alt="" className={styles.guestProfileImg} />
          <Icon icon="ph:plus-circle-fill" className={styles.imgEditBtn} onClick={onClickEditImg} />
        </div>
      </div>
      <div className={`${styles.nicknameWrapper} ${!isLoading && guestName.length > 0 && !useOk && styles.errorBox}`}>
        <input
          className={styles.nicknameInput}
          type="text"
          ref={nicknameRef}
          placeholder={"닉네임을 입력하세요"}
          onChange={changeHandler}
        />
        {guestName !== "" && nameLoading && (
          <div className={styles.spinnerContainer}>
            <CircularProgress className={styles.spinner} />
          </div>
        )}
      </div>
      <div className={styles.useOkTxt}>
        {!isLoading && guestName.length > 0 && useOk && <p className={styles.possible}>사용 가능한 닉네임입니다.</p>}
        {!isLoading && guestName.length > 0 && !useOk && (
          <p className={styles.impossible}>사용 불가능한 닉네임입니다.</p>
        )}
      </div>
      <div className={styles.btnWrapper}>
        <div className={styles.startBtn} onClick={onClickSubmit}>
          참여하기
        </div>
      </div>
    </div>
  );
};

export default ProfileNickname;
