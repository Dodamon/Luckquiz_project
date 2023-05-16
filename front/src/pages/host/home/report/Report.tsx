import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./Report.module.css";
import { Icon } from "@iconify/react";
import profile_sample from "assets/images/profile_sample.png";
import report_bg from "assets/images/report_bg.png";
import HomeListCard from "components/host/home/HomeListCard";
import { useEffect, useState } from "react";
import axios from "axios";
import useHostAxios from "hooks/useHostAxios";

export interface Report {
  id: number;
  title: string;
  date: string;
  participants: number;
}

 

const Report = () => {
  
  // const [myReportList, setMyReportList] = useState<Report[]>([])
  const { data, status, sendHostRequest } = useHostAxios();
  const myReportList: Report[] = [
    {
      id: 0,
      title: "ssafy 스타트 캠프 퀴즈",
      date: "2023년 03월 11일",
      participants: 342,
    },
    {
      id: 1,
      title: "CS Study 퀴즈",
      date: "2023년 03월 10일",
      participants: 123,
    },
    {
      id: 2,
      title: "갯벌소프트 퀴즈",
      date: "2023년 03월 03일",
      participants: 7,
    },
  ];

  useEffect(()=>{
    sendHostRequest({
      url: `/api/quizroom/create`,
    })
  }, [])


  return (
      <div className={styles.content} style={{ backgroundImage: report_bg }}>
        <div className={styles.title}></div>
        <div className={styles.listColFrame}>
          {myReportList.map((report, index) => (
            <Link key={index} to={`/home/report/${report.id}/basicinfo`} style={{width:"100%"}}>
              <HomeListCard menu={1} report={report}/>
            </Link>
          ))}
        </div>
      </div>
  );
};

export default Report;
