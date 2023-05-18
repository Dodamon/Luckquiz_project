import { useParams } from "react-router-dom";
import styles from "./Report.module.css";
import ReportTab from "components/host/home/report/ReportTab";
import ReportTable from "components/host/home/report/ReportTable";
import { useEffect, useState } from "react";
import useHostAxios from "hooks/useHostAxios";
import orangeCat from "assets/images/orange_logo.png";

type listType = {
  num: number;
  problem: string;
  successRate: number;
};

interface quizType {
  title: string;
  content: listType[];
}

const ReportQuiz = () => {
  const { report_id } = useParams();
  const [basicReport, setBasicReport] = useState<quizType>();
  const [title, setTitle] = useState<string>("");
  const { data, sendHostRequest } = useHostAxios();

  useEffect(() => {
    sendHostRequest({
      url: `/api/quiz/report/questions?id=${report_id}`,
    });
  }, []);

  useEffect(() => {
    if (data) {
      setBasicReport(data.slice);
      setTitle(data.title);
    }
  }, [data]);

  console.log(data);

  return (
    <div className={styles.content}>
      {basicReport && <div className={styles.title}>{title}</div>}
      <ReportTab report_id={report_id}></ReportTab>
      {basicReport && basicReport.content.length > 0 ? (
        <div
          className={styles.reportContent}
          style={{ backgroundColor: "var(--button-two)", flexDirection: "column", alignItems: "center", gap: "6%" }}
        >
          <div className={styles.reportWrapper}>
            <div className={styles.quizType}>
              <img src={orangeCat} alt="" style={{ width: "22px", height: "23px" }} />
              <div>가장 어려웠던 문제</div>
            </div>

            <ReportTable
              property={["번호", "문제", "정답률"]}
              data={[basicReport.content[basicReport.content.length - 1]]}
              type="quiz"
            />

            <div className={styles.quizTypeTwo}>
              <img src={orangeCat} alt="" style={{ width: "22px", height: "23px" }} />
              <div>전체 문제</div>
            </div>
            <ReportTable property={[]} data={basicReport.content.slice(0,basicReport.content.length-1)} type="quiz" />
          </div>
        </div>
      ) : (
        <div
          className={styles.reportContent}
          style={{ backgroundColor: "var(--button-two)", flexDirection: "column", alignItems: "center", gap: "6%" }}
        >
          <div
            style={{
              color: "var(--placeholder-text",
              backgroundColor: "white",
              width: "100%",
              height: "100%",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            문제 정보가 없습니다.
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportQuiz;
