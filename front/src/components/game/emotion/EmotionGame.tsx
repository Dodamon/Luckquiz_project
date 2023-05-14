import QuizGameTitle from "components/common/QuizGameTitle";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Webcam from "react-webcam";
import styles from "./EmotionGame.module.css";
import { socketActions } from "store/webSocket";
import { RootState } from "store";

const EmotionGame: React.FC = () => {
  const dispatch = useDispatch();

  const webcamRef = useRef<Webcam>(null);
  const faceBoxRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const [isFacingModeUser] = useState<boolean>(true);
  const [img, setImg] = useState<string | null | undefined>();        // react-webcam에서 capture로 얻은 image file
  const [analyzeCnt, setAnalyzeCnt] = useState(0);                    // emotion 분석 api 보낸 횟수 (분석 버튼 누른 횟수)
  const [emotionKor, setEmotionKor] = useState("");                   // 한국말로 바꾼 감정 결과
  
  const sender = useSelector((state: RootState) => state.guest.nickname);
  const roomId = useSelector((state: RootState) => state.socket.pinNum);
  const emotionResult = useSelector((state: RootState) => state.socket.emotionResult);
  const quizNum = useSelector((state:RootState) => state.socket.quizItem?.quizNum);
  const gotEmotion = useSelector((state:RootState) => state.socket.getEmotion);
  const emotion = useSelector((state:RootState) => state.socket.quizItem?.answer);


  const resizeImage = (img: string, maxSize: number) => {
    return new Promise<string | null>((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject("Failed to get canvas context.");
          return;
        }

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
        const resizedImg = canvas.toDataURL("image/jpeg", 1);
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

  const onClickPhoto = async () => {
    await capture();  
  };

  const onClickShootAgain = async () => {
    dispatch(socketActions.getEmotionResult(null));
    setImg("");
    dispatch(socketActions.getEmotionMessage(false));
  };

  const onClickAnalyze = () => {
    // submit selfie
    const destination = "/app/emotion";
    const selfie = {
      sender: sender,
      roomId: roomId,
      gameType: "emotion",
      quizNum: quizNum,
      file: img,
      
    };
    const emotionData = {
      destination: destination,
      body: selfie,
    };
    dispatch(socketActions.sendAnswerMessage(emotionData));
    setAnalyzeCnt((prev) => prev + 1);
  };

  const onClickSubmit = async () => {
    const destination = "/app/emotion/submit";
    const result = {
      roomId: roomId,
      sender: sender,
      emotionResult: {
        value: emotionResult?.emotion.value,
        confidence: emotionResult?.emotion.confidence,
      },
      quizNum: quizNum,
    };
    const data = {
      destination: destination,
      body: result,
    };
    dispatch(socketActions.sendAnswerMessage(data));
  };
 

  useEffect(() => {
    
    if (emotionResult) {
      const faceImg = document.getElementById("captured-img");
      // "angry", "disgust", "fear", "laugh", "neutral", "sad", "surprise", "smile", "talking"
      if (emotionResult.emotion.value === "angry") setEmotionKor("화남");
      else if (emotionResult.emotion.value === "disgust") setEmotionKor("혐오");
      else if (emotionResult.emotion.value === "fear") setEmotionKor("두려움");
      else if (emotionResult.emotion.value === "laugh" || emotionResult.emotion.value === "smile") setEmotionKor("기쁨");
      else if (emotionResult.emotion.value === "neutral") setEmotionKor("무표정");
      else if (emotionResult.emotion.value === "sad") setEmotionKor("슬픔");
      else if (emotionResult.emotion.value === "surprise") setEmotionKor("놀람");
      else if (emotionResult.emotion.value === "talking") setEmotionKor("수다");

      if (faceImg) {
        const left = faceImg.offsetLeft;
        const top = faceImg.offsetTop;

        faceBoxRef.current!.style.boxSizing = "border-box";
        faceBoxRef!.current!.style.border = "3px solid #1bd392";
        faceBoxRef!.current!.style.borderRadius = "10px";
        faceBoxRef!.current!.style.position = "absolute";
        faceBoxRef!.current!.style.top = `${top + emotionResult!.roi.y}px`;
        faceBoxRef!.current!.style.left = `${left + emotionResult!.roi.x}px`;
        faceBoxRef!.current!.style.width = `${emotionResult!.roi.width}px`;
        faceBoxRef!.current!.style.height = `${emotionResult!.roi.height}px`;

        resultRef!.current!.style.top = `${top + emotionResult!.roi.y - 45}px`;
        resultRef!.current!.style.left = `${left + emotionResult!.roi.x }px`;
        resultRef!.current!.style.position = "absolute";
        resultRef!.current!.style.width = "130px";
        resultRef!.current!.style.height = "40px";
        resultRef!.current!.style.color = "white";
        resultRef!.current!.style.backgroundColor = `#000000b8`;
        resultRef!.current!.style.borderRadius = `10px`;
        resultRef!.current!.style.display = "flex";
        resultRef!.current!.style.justifyContent = "center";
        resultRef!.current!.style.alignItems = "center";
        resultRef!.current!.style.gap = "10px";
      }
    };
    if (gotEmotion && !emotionResult) alert("인식된 얼굴이 없습니다. 다시 찍어보세요.");
  }, [emotionResult, gotEmotion]);

  return (
    <div className={styles.emotionGameContainer}>
      <QuizGameTitle title="오늘만큼은 나도 연기 왕" />
      <div className={styles.missionEmotion}>{emotion}</div>
      {img ? (
        <div className={styles.emotionGameCamera}>
          <div>
            <div ref={resultRef}>
              <div>
                {emotionResult && emotionKor}
              </div>
              <div>
                {emotionResult && emotionResult.emotion.confidence}
              </div>
            </div>
            <div ref={faceBoxRef}></div>
          </div>
          <img src={img} alt="" className={styles.photoImg} id="captured-img" />
          <div className={styles.btnWrapper}>
            <div className={styles.leftOpp}>
              남은 기회 : {3 - analyzeCnt}회
            </div>
            <button onClick={onClickShootAgain} className={styles.againBtn} disabled={analyzeCnt===3 && true}>
              다시 찍기
            </button>
            <button onClick={onClickAnalyze} className={styles.analyzeBtn} disabled={analyzeCnt===3 && true}>
              감정 분석
            </button>
            <button onClick={onClickSubmit} className={styles.submitBtn} disabled={emotionResult === null || analyzeCnt<1 ? true : false}>
              제출
            </button>
            
          </div>
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
