import React, { useEffect, useRef, useState } from "react";
import brokenegg from "assets/images/luckqui.png";
import egg_top from "assets/images/egg_top.png";
import egg_bottom from "assets/images/egg_bottom.png";
import luckqui from "assets/images/luckqui2.png";
import styles from "./WakeUpGame.module.css";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { socketActions } from "store/webSocket";
import { useDispatch } from "react-redux";

interface Props {
  handleOrder?: Function;
}

const WakeUpGame = (props: Props) => {
  const { handleOrder } = props;
  const dispatch = useDispatch()
  const roomId = useSelector((state: RootState) => state.socket.pinNum);
  const nickname = useSelector((state: RootState) => state.guest.nickname);
  const timer = useSelector((state: RootState) => state.socket.quizItem?.timer);
  const quizNum = useSelector((state: RootState) => state.socket.quizItem?.quizNum);
  // 게임 진행시간보다 애니메이션 노출시간만큼 빨리 끝나게 time 조정
  const [time, setTime] = useState(timer! - 6.5);
  // const [timeFormat, setTimeFormat] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [shakeCount, setShakeCount] = useState(0); // 흔든 횟수 제출
  const [isShaking, setIsShaking] = useState(false);
  const [isBroken, setIsBroken] = useState(false);
  const [showluckqui, setShowLuckqui] = useState(false);

  const submitAnswer = () => {
    console.log("자동제출: ", shakeCount);
    dispatch(
      socketActions.sendAnswerMessage({
        destination: "/app/submit",
        body: { sender: nickname, message: shakeCount, roomId: roomId, type: "SUBMIT", quizNum: quizNum },
      }),
    );
  };

  // 접속기기 확인
  const detectMobileDevice = (agent: string) => {
    const mobileRegex = [/Android/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];
    return mobileRegex.some((mobile) => agent.match(mobile));
  };

  const isMobile = detectMobileDevice(window.navigator.userAgent);

  // 모바일 기기에서 작동되는 shake감지 함수
  const handleMobileShake = (event: React.TouchEvent<HTMLDivElement>) => {
    console.log("shaked");
    setIsShaking(true);
    setShakeCount((prev) => prev + 1);
    setTimeout(() => {
      setIsShaking(false);
    }, 500);
  };

  // web에서 작동되는 shake감지 함수
  const handleWebShake = (event: KeyboardEvent) => {
    if (event.code === "Space" && !isBroken) {
      event.preventDefault();
      console.log("shaked");
      setIsShaking(true);
      setShakeCount((prev) => prev + 1);
    }
    setTimeout(() => {
      setIsShaking(false);
    }, 500);
  };

  // 마운트와 함께 타이머 시작
  useEffect(() => {
    // web이면, keydown listner작동
    !isMobile && window.addEventListener("keydown", handleWebShake);
    setIsRunning(true);
  }, []);
  
  // 타이머 작동
  useEffect(() => {
    if (isRunning && time > 0) {
      console.log("타이머 시작");
      let interval = setInterval(() => {
        setTime((prevTime) => prevTime - 0.01);
        console.log(time);
        // 시간이 끝나면 애니메이션 작동 및 interval 중지
        if (time.toFixed(2) === "0.00") {
          setIsBroken(true);
          setIsRunning(false);
          clearInterval(interval);
          submitAnswer()  // shake횟수 제출
          window.removeEventListener("keydown", handleWebShake);
        }
      }, 10);

      // setTimeout(() => {
      //             setIsBroken(true);
      //             setIsRunning(false);
      //             window.removeEventListener("keydown", handleWebShake);
        
      // }, time);

      // cleanup 함수에서 setInterval 정리
      return () => {
        clearInterval(interval);
        // clearTimeout(startGame)
      };
    }
  }, [time, isRunning]);

  useEffect(() => {
    if (isBroken) {
      // crack 애니메이션이 끝나면 럭퀴애니메이션 보여주기
      setTimeout(() => {
        setShowLuckqui(true);
      }, 1500);
      console.log("show");
    }
  }, [isBroken, setShowLuckqui]);

  useEffect(() => {
    if (showluckqui) {
      setTimeout(() => {
        handleOrder && handleOrder(2);
      }, 5000);
    }
  });

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        {/* <h1>Shake the Egg!</h1> */}
        {isBroken ? (
          showluckqui ? (
            <>
              <div className={styles.eggContainer} style={{ marginTop: "100px" }}>
                <div className={styles.eggImg}>
                  <img src={egg_top} alt="" className={styles.eggTop} />
                  <img src={luckqui} alt="" className={styles.luckqui} />
                  <img src={egg_bottom} alt="" className={styles.eggBottom} />
                </div>
                <div className={styles.eggShadow}></div>
              </div>
              <h2>You woke Luckqui up!</h2>
            </>
          ) : (
            <>
              <div id="time-box">Time Over</div>
              <div id="game-description">
                {isMobile ? "알을 터치하여 럭퀴를 깨워주세요" : "스페이스 바를 눌러 럭퀴를 흔들어 깨워주세요"}
              </div>
              <div className={styles.eggContainer}>
                <div className={styles.egg}></div>
                <div className={styles.crack}>
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <div className={styles.eggShadow}></div>
              </div>
            </>
          )
        ) : (
          <>
            {/* <div id="time-box">{time.toFixed(2)} 초</div> */}
            <div id="game-description">
              {isMobile ? "알을 터치하여 럭퀴를 깨워주세요" : "스페이스 바를 눌러 럭퀴를 흔들어 깨워주세요"}
            </div>
            <div className={styles.eggContainer}>
              <div
                className={isShaking ? styles.shakingEgg : styles.egg}
                onTouchStart={(e) => {
                  isMobile && handleMobileShake(e);
                }}
              ></div>
              <div className={isShaking ? styles.shakingEggShadow : styles.eggShadow}></div>
              <p>{shakeCount}번</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WakeUpGame;

