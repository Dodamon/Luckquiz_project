import styles from "./CountdownAni.module.css";

interface Props {
  handleOrder: Function;
}

const CountdownAni = (props: Props) => {
  const { handleOrder } = props;

  setTimeout(() => {
    handleOrder(1);
  }, 3800);

  return (
    <div className={styles.container}>
      <div className={styles.demo}>
        <div className={styles.blocks}>
          <div className={styles.rotater}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className={styles.blankInner}>
            <div className={styles.textReady}>Ready</div>
          </div>
        </div>
        <div className={styles.numbers}>
          <div className={styles.textThree}>
            <p>3</p>
          </div>
          <div className={styles.textTwo}>2</div>
          <div className={styles.textOne}>1</div>
        </div>
      </div>
    </div>
  );
};
export default CountdownAni;
