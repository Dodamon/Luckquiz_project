import { useParams } from "react-router-dom";
import styles from "./Report.module.css";
import ReportTab from "components/host/home/report/ReportTab";
import ReportTable from "components/host/home/report/ReportTable";
import { useEffect, useState } from "react";
import useHostAxios from "hooks/useHostAxios";

type listType = {
  rank: number;
  nickName: string;
  successRate: number;
  totalScore: number;
};

interface mainType {
  title: string;
  list: listType[];
}

const ReportPart = () => {
  const { report_id } = useParams();
  const [basicReport, setBasicReport] = useState<mainType | null>(null);
  const { data, status, sendHostRequest } = useHostAxios();

  useEffect(() => {
    sendHostRequest({
      url: `/api/quiz/report/participants?id=${report_id}`,
    });
  }, []);

  useEffect(() => {
    setBasicReport(data);
  }, [data]);

  return (
    <div className={styles.content}>
      {basicReport && <div className={styles.title}>{basicReport.title}</div>}
      <ReportTab report_id={report_id}></ReportTab>
      {basicReport && basicReport?.list.length > 0 ? (
        <div
          className={styles.reportContent}
          style={{
            backgroundColor: "var(--point-color)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <ReportTable property={["순위", "닉네임", "정답률", "총점"]} data={basicReport.list} type="part" />
        </div>
      ) : (
        <div
          className={styles.reportContent}
          style={{
            backgroundColor: "var(--point-color)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            fontSize: "20px",
          }}
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
            참여자 정보가 없습니다.
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportPart;
