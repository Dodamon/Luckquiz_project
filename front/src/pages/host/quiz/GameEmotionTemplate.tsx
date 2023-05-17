import React, { useState } from "react";
import styles from "./GameEmotionTemplate.module.css";
import emotions from "../../../assets/images/emotion_game.png";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { quizAtions } from "store/quiz";
import { RootState } from "store";
import { useSelector } from "react-redux";

const GameEmotionTemplate = () => {
  const [emotion, setEmotion] = useState("");
  const dispatch = useDispatch();
  const authInfo = useSelector((state: RootState) => state.auth.choiceIndex);
  const quizInfo = useSelector((state: RootState) => state.quiz.quizList);

  const emotionSelectHandler = (item: string) => {
    setEmotion(item);
    dispatch(quizAtions.emotionTypeUpdate({ index: authInfo, type: item }));
  };

  return (
    <>
      <div className={styles.emotion_content}>
        <div className={styles.emotion_intro}>
          <div className={styles.intro_img}>
            <img src={emotions} alt="" />
          </div>
          <div className={styles.intro_explain}>
            <div className={styles.intro_title}>셀카 감정 분석게임</div>
            <div className={styles.intro_comment}>
              <p>
                상단 메뉴에서 게임이 진행될 시간을 선택하고,
              </p>
              <p>
                하단 메뉴에서 미션으로 제시할 감정을 선택하세요.
              </p>
            </div>
            <div className={styles.intro_discription}>
              게임이 시작되면 미션으로 주어진 감정에 맞는 표정을 셀카로 찍어 업로드 합니다. 표정을 분석하여 미션 감정의 수치가 가장 높게 나온 사람부터 순차적으로 점수가 부여됩니다.
            </div>
          </div>
        </div>

        <div className={styles.emotion_select}>
          <ul className={styles.emotion_grid}>
            <li
              onClick={() => emotionSelectHandler("smile")}
              style={quizInfo[authInfo].answer === "smile" ? { opacity: "60%" } : {}}
            >
              <div className={styles.emotion_box} style={{ backgroundColor: "var(--select-two)" }}>
                <Icon icon="ri:emotion-line" />
              </div>
              <div className={styles.emotion_ment}>기쁨</div>
            </li>

            <li
              onClick={() => emotionSelectHandler("sad")}
              style={quizInfo[authInfo].answer === "sad" ? { opacity: "60%" } : {}}
            >
              <div className={styles.emotion_box} style={{ backgroundColor: "var(--select-four)" }}>
                <Icon icon="ri:emotion-sad-line" />
              </div>
              <div className={styles.emotion_ment}>슬픔</div>
            </li>

            <li
              onClick={() => emotionSelectHandler("fear")}
              style={quizInfo[authInfo].answer === "fear" ? { opacity: "60%" } : {}}
            >
              <div className={styles.emotion_box} style={{ backgroundColor: "var(--select-three)" }}>
                <Icon icon="icon-park-outline:distraught-face" />
              </div>
              <div className={styles.emotion_ment}>두려움</div>
            </li>

            <li
              onClick={() => emotionSelectHandler("angry")}
              style={quizInfo[authInfo].answer === "angry" ? { opacity: "60%" } : {}}
            >
              <div className={styles.emotion_box} style={{ backgroundColor: "var( --select-one)" }}>
                <Icon icon="fluent:emoji-angry-16-regular" style={{ fontSize: "55px", fontWeight: "bold" }} />
              </div>
              <div className={styles.emotion_ment}>분노</div>
            </li>

            <li
              onClick={() => emotionSelectHandler("disgust")}
              style={quizInfo[authInfo].answer === "disgust" ? { opacity: "60%" } : {}}
            >
              <div className={styles.emotion_box} style={{ backgroundColor: "var(--etc-one)" }}>
                <Icon icon="mdi:face-dead-outline" />
              </div>
              <div className={styles.emotion_ment}>혐오</div>
            </li>

            <li
              onClick={() => emotionSelectHandler("surprise")}
              style={quizInfo[authInfo].answer === "surprise" ? { opacity: "60%" } : {}}
            >
              <div className={styles.emotion_box} style={{ backgroundColor: "var(--etc-two)" }}>
                <Icon icon="icon-park-outline:astonished-face" />
              </div>
              <div className={styles.emotion_ment}>놀람</div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default GameEmotionTemplate;
