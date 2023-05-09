import styles from "./ButtonWithLogo.module.css";
import orange_logo from "assets/images/orange_logo.png";

interface Props {
  name: string;
  color?: string;
  fontSize?: string;
}

const ButtonWithLogo = (props: Props) => {
  const { name, color, fontSize } = props;
  return (
    <div className={styles.btnBox}>
      <div className={styles.logoBox}>{/* <img src={orange_logo} alt="" /> */}</div>
      <div className={styles.nameBox} style={{ backgroundColor: color }}>
        <div className={styles.name} style={{ fontSize: fontSize }}>
          {name}
        </div>
      </div>
    </div>
  );
};
export default ButtonWithLogo;