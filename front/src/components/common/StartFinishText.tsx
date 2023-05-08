import styles from "./StartFinishText.module.css";

const StartFinishText = () => {

  return (
    <div className={styles.container}>
          <p className={styles.offscreenText}></p>
          <p className={styles.text}></p>

      <svg id="svg"></svg>

      <input type="text" className="input" />
    </div>
  );
};
export default StartFinishText;
