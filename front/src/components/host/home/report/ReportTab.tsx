import { Link } from "react-router-dom";
import styles from "./ReportTab.module.css";

interface Props {
  report_id : string | undefined
}

const ReportTab = (props : Props) => {
  const { report_id } = props
  return (
    <div className={`${styles[`row`]}`}>
      <Link to={`/home/report/${report_id}/basicinfo`} className={`${styles[`bookmarker`]}`} style={{backgroundColor: "white"}}>기본 정보</Link>
      <Link to={`/home/report/${report_id}/partinfo`} className={`${styles[`bookmarker`]}`} style={{backgroundColor: "var(--button-one)"}}>참여자 정보</Link>
      <Link to={`/home/report/${report_id}/quizinfo`} className={`${styles[`bookmarker`]}`} style={{backgroundColor: "var(--button-two)"}}>퀴즈 정보</Link>
    </div>
  );
};
export default ReportTab;
