import styles from "./Report.module.css";

const ReportPart = () => {
  return (
    <div className={`${styles[`content`]}`} style={{ backgroundColor: "var(--mypage-background)" }}>
    <div className={`${styles[`title`]}`}>레포트</div>
    </div>
  )
}

export default ReportPart