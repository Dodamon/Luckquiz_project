import styles from "./ButtonWithLogo.module.css";
import orange_logo from "assets/images/orange_logo.png";

interface Props {
  name: string;
  height?: string;
  color?: string;
  fontSize?: string;
  onClick?: Function;
}

const ButtonWithLogo = (props: Props) => {
  const { name, height, color, fontSize, onClick } = props;
  return (
    <div
      className={styles.btnBox}
      style={{ height: height }}
      onClick={() => {
        onClick && onClick();
      }}
    >
      <img className={styles.logoBox} src={orange_logo} alt="" />
      <div className={styles.nameBox} style={{ backgroundColor: color }}>
        <div className={styles.name} style={{ fontSize: fontSize }}>
          {name}
        </div>
      </div>
    </div>
  );
};
export default ButtonWithLogo;
