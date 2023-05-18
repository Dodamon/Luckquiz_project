import { useParams } from "react-router-dom";
import styles from "./Report.module.css";
import ReportTab from "components/host/home/report/ReportTab";
import { Icon } from "@iconify/react";
import report_logo from "assets/images/report_logo.png";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import useHostAxios from "hooks/useHostAxios";

interface basicType {
  title: string;
  participantCount: number;
  quizCount: number;
  gameCount: number;
  duration: string;
  successRate: number;
}

const reportBasic = {
  title: "SSAFY 스타트 캠프 퀴즈",
  parti: 431,
  quizs: 21,
  games: 5,
  times: 188,
  percentage: 42,
};

const ReportBasic = () => {
  const { report_id } = useParams();

  const [basicReport, setBasicReport] = useState<basicType | null>(null);
  const [pieData, setPieData] = useState<any>();

  const { data, status, sendHostRequest } = useHostAxios();

  useEffect(() => {
    sendHostRequest({
      url: `/api/quiz/report/info?id=${report_id}`,
    });
  }, []);

  // data 받아왔을 때 basicReport, pieData 변경
  useEffect(() => {
    if (data) {
      setBasicReport(data);
      // setSuccessRate(data.successRate);
      const dataSet = {
        labels: [],
        datasets: [
          {
            data: [data.successRate, 100 - data.successRate],
            backgroundColor: ["#7557ff", "#f75555"],
            borderRadius: 30,
            cutout: "60%",
          },
        ],
        options: {
          tooltips: {
            enabled: false,
          },
        },
      };
      setPieData(dataSet);
    }
  }, [data]);

  console.log("basic_data : ", data);
  console.log("basic_reportID : ", report_id);

  return (
    <div className={styles.content}>
      {basicReport && <div className={styles.title}>{basicReport.title}</div>}
      <ReportTab report_id={report_id}></ReportTab>

      <div
        className={styles.reportContent}
        style={{
          backgroundColor: "var(--white-color)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div className={styles.chartContainer}>
            <img src={report_logo} alt="" width={"30%"} style={{ marginLeft: "60%" }} />
            <div className={styles.chartBox}>
              <div className={styles.percentageBox} style={{ display: "flex", alignItems: "center" }}>
                <div className={styles.textStyle}>총 정답률</div>
                {basicReport && <div className={styles.textStyle}>{basicReport.successRate}%</div>}
              </div>
              <div className={styles.pieStyle}>{pieData && <Doughnut data={pieData} />}</div>
            </div>
          </div>
          <ul className={styles.reportContentList}>
            <li className={styles.reportContentItem}>
              <Icon icon="iconoir:user" className={styles.iconStyle} />
              <div className={styles.textStyle}>참여자 수</div>
              {basicReport && <div>{basicReport.participantCount} 명</div>}
            </li>
            <li className={styles.reportContentItem}>
              <Icon icon="iconoir:question-mark-circle" className={styles.iconStyle} />
              <div className={styles.textStyle}>퀴즈 개수</div>
              {basicReport && <div> {basicReport.quizCount} 개 </div>}
            </li>
            <li className={styles.reportContentItem}>
              <Icon icon="iconoir:gamepad" className={styles.iconStyle} />
              <div className={styles.textStyle}>게임 개수</div>
              {basicReport && <div>{basicReport.gameCount} 개</div>}
            </li>
            <li className={styles.reportContentItem}>
              <Icon icon="iconoir:alarm" className={styles.iconStyle} />
              <div className={styles.textStyle}>소요 시간</div>
              {basicReport && (
                <div>
                  {Math.floor(parseInt(basicReport.duration) / 60)}분 {parseInt(basicReport.duration) % 60}초
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReportBasic;
