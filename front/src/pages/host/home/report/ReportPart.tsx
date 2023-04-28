import { useParams } from "react-router-dom";
import styles from "./Report.module.css";
import ReportTab from "components/host/home/report/ReportTab";
import ReportTable from "components/host/home/report/ReportTable";

const parti = {
  title: "SSAFY 스타트 캠프 퀴즈",
  list: [
    {
      rank: 1,
      name: "체고두뇌 이예진",
      answer: 99.9,
      score: 999,
    },
    {
      rank: 2,
      name: "체고두뇌 서유진",
      answer: 99,
      score: 998,
    },
    {
      rank: 3,
      name: "체고두뇌 예니옌",
      answer: 99,
      score: 998,
    },
  ],
};

const ReportPart = () => {
  const { report_id } = useParams();
  return (
    <div className={`${styles[`content`]}`}>
      <div className={`${styles[`title`]}`}>{parti.title}</div>
      <ReportTab report_id={report_id}></ReportTab>
      <div className={`${styles[`report-content`]}`} style={{ backgroundColor: "var(--point-color)" }}>
        <ReportTable property={["순위", "닉네임", "정답률", "총점"]} data={parti.list} />
      </div>
    </div>
  );
};

export default ReportPart;
