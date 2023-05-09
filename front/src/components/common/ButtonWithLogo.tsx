import { height } from "@mui/system";
import styles from "./ButtonWithLogo.module.css";
import orange_logo from "assets/images/orange_logo.png";

interface Props {
  name: string;
  height?: string;
  color?: string;
  fontSize?: string;
  callback?: Function
}

const ButtonWithLogo = (props: Props) => {
  const { name, height, color, fontSize, callback } = props;
  return (
    <div className={styles.btnBox} style={{ height: height }} onClick={
      () => {callback}
    }>
      <div className={styles.logoBox}></div>
      <div className={styles.nameBox} style={{ backgroundColor: color }}>
        <div className={styles.name} style={{ fontSize: fontSize }}>
          {name}
        </div>
      </div>
    </div>
  );
};
export default ButtonWithLogo;
