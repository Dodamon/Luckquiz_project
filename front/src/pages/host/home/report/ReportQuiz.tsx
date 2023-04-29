import { useParams } from "react-router-dom";
import styles from "./Report.module.css";
import ReportTab from "components/host/home/report/ReportTab";
import ReportTable from "components/host/home/report/ReportTable";
import ButtonWithLogo from "components/common/ButtonWithLogo";

const quiz = {
  title: "SSAFY 스타트 캠프 퀴즈",
  list: [
    {
      id: 1,
      title: "SSAFY 캠퍼스는 전국에 6개이다.",
      answer: 78.7,
    },
    {
      id: 2,
      title: "2학기에 총 몇 번의 프로젝트가 진행되나요?",
      answer: 78.7,
    },
    {
      id: 3,
      title: "SSAFY 월급은 얼마일까요?",
      answer: 78.7,
    },
    // {
    //   id: 3,
    //   title: "SSAFY 월급은 얼마일까요?",
    //   answer: 78.7,
    // },
    // {
    //   id: 3,
    //   title: "SSAFY 월급은 얼마일까요?",
    //   answer: 78.7,
    // },
    // {
    //   id: 3,
    //   title:
    //     "SSAFY 월급은 얼마일까요?",
    //   answer: 78.7,
    // },
  ],
};

const hardest = [
  {
    id: 1,
    title: "SSAFY 캠퍼스는 전국에 6개이다.",
    answer: 78.7,
  },
];

const ReportQuiz = () => {
  const { report_id } = useParams();
  return (
    <div className={`${styles[`content`]}`}>
      <div className={`${styles[`title`]}`}>{quiz.title}</div>
      <ReportTab report_id={report_id}></ReportTab>
      <div
        className={`${styles[`report-content`]}`}
        style={{ backgroundColor: "var(--button-two)", flexDirection: "column", alignItems: "start", gap: "6%" }}
      >
        <ButtonWithLogo name={"가장 어려웠던 문제"} color="var(--select-three)" fontSize="18px" />
        <ReportTable property={[]} data={hardest} />
        <ButtonWithLogo name={"전체 문제 보기"} color="var(--select-three)" fontSize="18px" />
        <ReportTable property={[]} data={quiz.list} />
      </div>
    </div>
  );
};

export default ReportQuiz;
