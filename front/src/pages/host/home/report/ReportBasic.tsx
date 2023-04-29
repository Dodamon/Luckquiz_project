import { useParams } from "react-router-dom";
import styles from "./Report.module.css";
import ReportTab from "components/host/home/report/ReportTab";
import { Icon } from "@iconify/react";
import report_logo from "assets/images/report_logo.png";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

const reportBasic = {
  title: "SSAFY 스타트 캠프 퀴즈",
  parti: 431,
  quizs: 21,
  games: 5,
  times: 188,
  percentage: 42,
};

const data = {
  labels: [],
  datasets: [
    {
      data: [42, 58], // 정답율, 오답율
      backgroundColor: ["#7557ff", "#f75555"],
      borderRadius: 30,
      borderColor: "#ffff",
      borderWidth: 2.5,
      cutout: "60%",
      // shadowOffsetX: 30,
      // shadowOffsetY: 30,
      // shadowBlur: 10,
      // shadowColor: "#a3c8ff",
    },
  ],
  options: {
    tooltips: {
      endabled: false,
    },
  },
};


const ReportBasic = () => {
  const { report_id } = useParams();
  // getReportBasic

  return (
    <div className={`${styles[`content`]}`}>
      <div className={`${styles[`title`]}`}>{reportBasic.title}</div>
      <ReportTab report_id={report_id}></ReportTab>
      <div className={`${styles[`report-content`]}`} style={{ backgroundColor: "white" }}>
        <ul>
          <li>
            <Icon icon="iconoir:user" className={`${styles[`icon-style`]}`} />
            <div className={`${styles[`text-style`]}`}>참여자 수</div>: {reportBasic.parti} 명
          </li>
          <li>
            <Icon icon="iconoir:question-mark-circle" className={`${styles[`icon-style`]}`} />
            <div className={`${styles[`text-style`]}`}>퀴즈 개수</div>: {reportBasic.quizs} 개
          </li>
          <li>
            <Icon icon="iconoir:gamepad" className={`${styles[`icon-style`]}`} />
            <div className={`${styles[`text-style`]}`}>게임 개수</div>: {reportBasic.games} 개
          </li>
          <li>
            <Icon icon="iconoir:alarm" className={`${styles[`icon-style`]}`} />
            <div className={`${styles[`text-style`]}`}>소요 시간</div>: {Math.floor(reportBasic.times / 60)}분{" "}
            {reportBasic.times % 60}초
          </li>
        </ul>
        <div className={`${styles[`chart-container`]}`}>
          <img src={report_logo} alt="" width={"50%"} style={{ marginRight: "20px" }} />
          <div className={`${styles[`chart-box`]}`}>
            <div style={{display:"flex", alignItems:"center"}}>
              <div className={`${styles[`text-style`]}`}>총 정답률</div>
              <div className={`${styles[`text-style`]}`}>{reportBasic.percentage}%</div>
            </div>
            <div className={`${styles[`pie-style`]}`}>
            <Doughnut data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportBasic;
