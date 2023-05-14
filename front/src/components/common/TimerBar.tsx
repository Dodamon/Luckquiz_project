import { useEffect } from "react";
import styles from "./TimerBar.module.css"

interface Props {
  time: number;
  handleOrder: Function;
  handleSubmit?: Function;  // 호스트한테는 하나의 퀴즈가 끝났다는 turnend publish 함수를 받아오고
  // 게스트한테는 퀴즈답을 제출하는 submit publish 함수를 받아옵니다.
}

// &:after 가상요소에서 쓸 변수를 넘겨주기 위한 cssproperties타입 커스텀
interface CustomCSSProperties {
  "--countdown-time": string;
}
type CSSProperties = React.CSSProperties & CustomCSSProperties;

const TimerBar = ({ time, handleOrder, handleSubmit }: Props) => {

  useEffect(() => {
    // 마운트시 time 활성화
    let timer = setTimeout(() => {
      handleOrder(2);
      handleSubmit && handleSubmit()
    }, time * 1000);


    // 언마운트시 timer reset
    return () => {
      clearTimeout(timer)
    };
  }, [])
    
    const style: CSSProperties = {
    "--countdown-time": `${time}s`,
  };

  return <div className={styles.timerBar} style={style}></div>;
};

export default TimerBar;
