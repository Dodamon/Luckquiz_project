import styles from "./TimerBar.module.css"

interface Props {
  time: number;
  handleOrder: Function;
}

// &:after 가상요소에서 쓸 변수르 넘겨주기 위한 cssproperties타입 커스텀
interface CustomCSSProperties {
  "--countdown-time": string;
}
type CSSProperties = React.CSSProperties & CustomCSSProperties;

const TimerBar = ({ time, handleOrder }: Props) => {

  setTimeout(() => {
    handleOrder(2);
  }, time * 1000);

  const style: CSSProperties = {
    "--countdown-time": `${time}s`,
  };

  return <div className={styles.timerBar} style={style}></div>;
};

export default TimerBar;
