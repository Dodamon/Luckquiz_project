import { Link } from "react-router-dom";
import styles from "./Report.module.css";
import report_bg from "assets/images/report_bg.png";
import HomeListCard from "components/host/home/HomeListCard";
import { useEffect, useState } from "react";
import useHostAxios from "hooks/useHostAxios";
import { useSelector } from "react-redux";
import { RootState } from "store";

export interface Report {
    reportId: number;
    title: string;
    createdTime: string;
    participantCount: number;
}

const Report = () => {
  // const [myReportList, setMyReportList] = useState<Report[]>([])
  const { data, status, sendHostRequest } = useHostAxios();
  const userId = useSelector((state: RootState)=> state.auth.userId);
  const [reportList, setReportList]=useState<Report[]>([]);
  const [updataChk, setUpdateChk] = useState(false);
  useEffect(()=>{
    sendHostRequest({
      url: `/api/quiz/report`,
    })
  }, [updataChk])

  useEffect(()=>{
  
    if(data){
      const reportinfo = data.content.sort((a: any, b: any) => {
        const dateA = new Date(a.createdTime);
        const dateB = new Date(b.createdTime);
        if (dateA < dateB) {
          return 1;
        }
        if (dateA > dateB) {
          return -1;
        }
        return 0;
      });
      setReportList(reportinfo);
    }
  }, [data])

  
  

  return (
      <div className={styles.content} style={{ backgroundImage: report_bg }}>
        <div className={styles.scrollWrapper}>
          <div className={styles.listColFrame}>
        
            {(reportList && reportList.length===0)?<div  className={styles.empty_comment}>기록된 레포트가 없습니다.</div>:
           reportList &&reportList.map((report:Report, index:number) => (
              <a key={index}  style={{width:"100%"}}>
                <HomeListCard menu={1} report={report} setUpdateChk={setUpdateChk} updataChk={updataChk}/>
              </a>
            ))}
          </div>
        </div>
      </div>
  
  );
};

export default Report;
