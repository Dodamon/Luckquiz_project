import QuizGameTitle from "components/common/QuizGameTitle";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Webcam from "react-webcam";
import styles from "./EmotionGame.module.css";
import {  client, socketActions } from "store/webSocket";
// import { client } from "App";
import { RootState } from "store";

const EmotionGame: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [isFacingModeUser] = useState<boolean>(true);
  const [img, setImg] = useState<string | null | undefined>();
  const sender = useSelector<RootState, string>((state) => state.guest.nickname);

  const dispatch = useDispatch();

  const resizeImage = (img: string, maxSize: number) => {
    return new Promise<string | null>((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject("Failed to get canvas context.");
          return;
        };

        // Resize the canvas to fit the image within the maximum size
        let width = image.width;
        let height = image.height;
        let scaleFactor = 1;
        if (img.length > maxSize) {
          scaleFactor = Math.sqrt(maxSize / img.length);
          width *= scaleFactor;
          height *= scaleFactor;
        }
        canvas.width = width;
        canvas.height = height;

        // Draw the image on the canvas
        ctx.drawImage(image, 0, 0, width, height);

        // Convert the canvas back to an image
        const resizedImg = canvas.toDataURL("image/jpeg", 0.9);
        resolve(resizedImg);
      };
      image.onerror = () => {
        reject("Failed to load image.");
      };
      image.src = img;
    });
  };

  const capture = async () => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) {
        const maxSize = 1.9 * 1024 * 1024; // 1.9MB in bytes
        const resizedImg = await resizeImage(screenshot, maxSize);
        setImg(resizedImg);
      }
  };

  const handleUserMediaError = () => {
    window.alert("cant access your camera");
  };

  const onClickPhoto = () => {
    capture();
  };

  const onClickSubmit = () => {
    // submit selfie
    const selfie = {
      sender: sender,
      message: "submit",
      roomId: 123, 
      type: "SUBMIT",
      gameType: "emotion",
      file: img
    };

    dispatch(socketActions.sendAnswerMessage({destination:"", body: selfie }));

  };

  useEffect(() => {
    console.log(client.connected)
  }, [])

  return (
    <div className={styles.emotionGameContainer}>
      <QuizGameTitle title="오늘만큼은 나도 연기 왕" />

      {img ? (
        <div className={styles.emotionGameCamera}>
          <img src={img} alt="" className={styles.photoImg} />
          <button onClick={() => setImg("")} className={styles.againBtn}>
            다시 찍기
          </button>
          <button onClick={onClickSubmit} className={styles.submitBtn}>
            제출
          </button>
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
