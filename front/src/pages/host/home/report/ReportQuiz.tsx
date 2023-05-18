import { useParams } from "react-router-dom";
import styles from "./Report.module.css";
import ReportTab from "components/host/home/report/ReportTab";
import ReportTable from "components/host/home/report/ReportTable";
import ButtonWithLogo from "components/common/ButtonWithLogo";
import { useEffect, useState } from "react";
import axios from "axios";
import useHostAxios from "hooks/useHostAxios";





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

type listType ={
  id: number,
  title: string,
  answer: number,
}

interface quizType {
  title: string,
  list :listType[]
}


const ReportQuiz = () => {
  const { report_id } = useParams();
  const [basicReport, setBasicReport] = useState<quizType>();
  const { data, status, sendHostRequest } = useHostAxios();
  useEffect(()=>{
    sendHostRequest({
      url: `/api/quiz/report/questions?id=${report_id}`,
    })
  }, [])


  console.log(data);
  


  return (
    <div className={styles.content}>
      <div className={styles.title}>{quiz.title}</div>
      <ReportTab report_id={report_id}></ReportTab>
  
      <div
        className={styles.reportContent}
        style={{ backgroundColor: "var(--button-two)", flexDirection: "column", alignItems: "start", gap: "6%" }}
      >
         <div className={styles.part_title} >
          <div  style={{ backgroundColor: "orange"}}>퀴즈정보</div>
        </div>
        <ButtonWithLogo name={"가장 어려웠던 문제"} color="var(--select-three)" fontSize="18px" height="40px"/>
        <ReportTable property={[]} data={hardest} />
        <ButtonWithLogo name={"전체 문제 보기"} color="var(--select-three)" fontSize="18px" height="40px"/>
        <ReportTable property={[]} data={quiz.list} />
      </div>
    </div>
  );
};

export default ReportQuiz;
