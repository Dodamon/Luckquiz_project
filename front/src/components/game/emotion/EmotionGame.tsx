import QuizGameTitle from "components/common/QuizGameTitle";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import styles from "./EmotionGame.module.css";

interface WebcamProps {
  audio: boolean;
  style: React.CSSProperties;
  screenshotFormat: string;
  videoConstraints: {
    facingMode: string;
  };
  onUserMediaError: () => void;
}

const EmotionGame: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [isFacingModeUser, setIsFacingModeUser] = useState<boolean>(true);
  const [img, setImg] = useState<string | null | undefined>();

  const capture = () => {
    const img = webcamRef.current?.getScreenshot();
    setImg(img);
  };

  const handleUserMediaError = () => {
    window.alert("cant access your camera");
  };

  const onClickPhoto = () => {
    capture();
  };

  const onClickSubmit = () => {
    // submit selfie
    // setSubmit true => useEffect( true일 때 Azure API로 쏘기 )
    // ... 결과 받으면 띄우기
  };

  return (
    <div className={styles.emotionGameContainer}>
      <QuizGameTitle title="오늘만큼은 나도 연기 왕" />

      {img ? (
          <div className={styles.emotionGameCamera}>
            <img src={img} alt="" className={styles.photoImg}/>
            <button onClick={() => setImg("")} className={styles.againBtn}>다시 찍기</button>
            <button onClick={onClickSubmit} className={styles.submitBtn}>제출</button>
        </div>
      ) : (
        <>
          <div className={styles.emotionGameCamera}>
            <Webcam
              audio={false}
              className={styles.camera}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode: isFacingModeUser ? "user" : "environment",
              }}
              onUserMediaError={handleUserMediaError}
            /> 
          </div>
          <button onClick={onClickPhoto} className={styles.shootBtn}>
            촬영
          </button>
        </>
      )}
    </div>
  );
};

export default EmotionGame;
