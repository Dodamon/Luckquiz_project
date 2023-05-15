import { useEffect } from "react";
import styles from "./TimerBar.module.css";
import { useSelector } from "react-redux";
import { RootState } from "store";

interface Props {
  handleOrder: Function;
  handleSubmit?: Function; // 호스트한테는 하나의 퀴즈가 끝났다는 turnend publish 함수를 받아오고
  // 게스트한테는 퀴즈답을 제출하는 submit publish 함수를 받아옵니다.
}

// &:after 가상요소에서 쓸 변수를 넘겨주기 위한 cssproperties타입 커스텀
interface CustomCSSProperties {
  "--countdown-time": string;
}
type CSSProperties = React.CSSProperties & CustomCSSProperties;

const TimerBar = ({ handleOrder, handleSubmit }: Props) => {
  const isHost = useSelector((state: RootState) => state.auth.isAuthenticated);
  const gametype = useSelector((state: RootState) => state.socket.quizItem?.game);
  const time = useSelector((state: RootState) => state.socket.quizItem?.timer);

  useEffect(() => {
    // 마운트시 time 활성화
    let timer = setTimeout(() => {
      if (isHost) {
        handleOrder(2);
      } else {
        // 게스트의 wakeup,balloon 게임에서는 애니메이션을 보여줘야해서 해당 컴포넌트에서 handleorder
        if (gametype !== "wakeup" && gametype !== "balloon") {
          handleOrder(2);
          handleSubmit && handleSubmit(); // 자동제출
        }
      }
      // 게스트의 제출과 호스트의 end 알림이 동시에 가면 게스트 답안 채점이 됩니까?
    }, time! * 1000);

    // 언마운트시 timer reset
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // 보여지는 timerbar 시간세팅값 :
  // 게스트의 wakeup 게임에서는 애니메이션을 보여줘야해서 게임시간 - 애니메이션노출시간(6.5s) 만큼 타이머 세팅
  const barTime = !isHost && gametype === "wakeup" ? time! - 6.5 : time;

  const style: CSSProperties = {
    "--countdown-time": `${barTime}s`,
  };

  return <div className={styles.timerBar} style={style}></div>;
};

export default TimerBar;
