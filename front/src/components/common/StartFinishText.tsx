import styles from "./StartFinishText.module.css";

const StartFinishText = (props: {title : string}) => {
  const {title} = props
  const titleArr = title.split('')

  return (
    <div className={styles.title}>
      {titleArr.map((t, index) => (<span key={index}>{t}</span>))}
    </div>
  );
};
export default StartFinishText;
