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
  title: string,
  participantCount: number,
  quizCount: number,
  gameCount: number,
  duration: string,
  successRate: number,
}
const reportBasic = {
  title: "SSAFY 스타트 캠프 퀴즈",
  parti: 431,
  quizs: 21,
  games: 5,
  times: 188,
  percentage: 42,
};

const datas = {
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

  const [basicReport, setBasicReport] = useState<basicType[]>([]);
  const { data,status, sendHostRequest } = useHostAxios();
  useEffect(()=>{
    sendHostRequest({
      url: `/api/quiz/report/info?id=${report_id}`,
    })
  },[])

  console.log("맞냐구용 ㅋㅋ",data);
  console.log("맞냐구용 ㅋㅋ",report_id);

  return (
    <div className={styles.content}>
      <div className={styles.title}>{reportBasic.title}</div>
      <ReportTab report_id={report_id}></ReportTab>

      <div className={styles.reportContent} style={{ backgroundColor: "var(--white-color)", display:'flex', flexDirection: "column", alignItems:"center"  }}>
      <div className={styles.part_title}>
  <div>퀴즈 정보</div>
    </div>
    <div style={{display:'flex', justifyContent:"space-around",alignItems:"center", width:"100%" }}>
        <ul className={styles.reportContentList}>
        
        <li className={styles.reportContentTitle} >
            {/* <Icon icon="iconoir:user" className={styles.iconStyle} /> */}
            <div className={styles.textTitle}>퀴즈통계</div>
          </li>
          <li className={styles.reportContentItem} >
            <Icon icon="iconoir:user" className={styles.iconStyle} />
            <div className={styles.textStyle}>참여자 수</div>: {reportBasic.parti} 명
          </li>
          <li className={styles.reportContentItem} >
            <Icon icon="iconoir:question-mark-circle"  className={styles.iconStyle} />
            <div className={styles.textStyle}>퀴즈 개수</div>: {reportBasic.quizs} 개
          </li>
          <li className={styles.reportContentItem} >
            <Icon icon="iconoir:gamepad" className={styles.iconStyle} />
            <div className={styles.textStyle}>게임 개수</div>: {reportBasic.games} 개
          </li>
          <li className={styles.reportContentItem} >
            <Icon icon="iconoir:alarm" className={styles.iconStyle} />
            <div className={styles.textStyle}>소요 시간</div>: {Math.floor(reportBasic.times / 60)}분{" "}
            {reportBasic.times % 60}초
          </li>
        </ul>
        <div className={styles.chartContainer}>
          <img src={report_logo} alt="" width={"50%"} style={{ marginRight: "20px" }} />
          <div className={styles.chartBox}>
            <div className={styles.percentageBox} style={{display:"flex", alignItems:"center"}}>
              <div className={styles.textStyle}>총 정답률</div>
              <div className={styles.textStyle}>{reportBasic.percentage}%</div>
            </div>
            <div className={styles.pieStyle}>
            <Doughnut data={datas} />
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ReportBasic;
