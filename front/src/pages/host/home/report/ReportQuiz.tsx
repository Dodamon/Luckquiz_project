import { useParams } from "react-router-dom";
import styles from "./Report.module.css";
import ReportTab from "components/host/home/report/ReportTab";
import { styled } from "@mui/material/styles";
import ReportTable from "components/host/home/report/ReportTable";


const parti = {
  title: "SSAFY 스타트 캠프 퀴즈",
  list: [
    {
      id:1,
      title:"SSAFY 캠퍼스는 전국에 6개이다. 2학기에 총 몇 번의 프로젝트가 진행되나요? 감기몸살로 결석하면 공가처리가 가능하다. 싸버지 성함은 무엇인가요? SSAFY 월급은 얼마일까요?"
      // answer: 78.7,
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

const ReportQuiz = () => {
  const { report_id } = useParams();
  return (
    <div className={`${styles[`content`]}`}>
      <div className={`${styles[`title`]}`}>{parti.title}</div>
      <ReportTab report_id={report_id}></ReportTab>
      <div className={`${styles[`report-content-col`]}`} style={{ backgroundColor: "var(--button-two)" }}>
        <div>
          <div className={`${styles[`subtitle`]}`}>가장어려웠던 문제</div>
          <div className={`${styles[`row`]}`}>
            <div></div>
            <div></div>
            정답률
            <div></div>
          </div>
        </div>
        <div>
          <div className={`${styles[`subtitle`]}`}>전체 문제 보기</div>
          <ReportTable property={[]} data={parti.list} />
        </div>
      </div>
    </div>
  );
};

export default ReportQuiz;
