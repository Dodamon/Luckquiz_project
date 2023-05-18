import styles from "./NameTag.module.css";

interface Props {
  subtitle: string;
}
export default function NameTag({ subtitle }: Props) {
  return (
    <div className={styles.tag}>
      <div className={styles.header}>
        <div className={styles.title}>Luckquiz</div>
      </div>
      <div className={styles.subtitle}>{subtitle}</div>
    </div>
  );
}
