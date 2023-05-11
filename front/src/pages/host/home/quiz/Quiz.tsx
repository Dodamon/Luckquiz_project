import { Link, Outlet, useNavigate, useOutletContext } from "react-router-dom";
import styles from "./Quiz.module.css";
import { Icon } from "@iconify/react";
import HomeListCard from "components/host/home/HomeListCard";
import SubmitChart from "components/host/quiz/SubmitChart";
import Podium from "components/common/Podium";
import { useEffect, useState } from "react";
import Modal from "components/host/quiz/Modal";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useDispatch } from "react-redux";
import { authActions } from "store/auth";
import useHostAxios from "hooks/useHostAxios";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
export interface Quiz {
  name: string;
  templateId: string;
  date: string;
}




type setBackground = {
  isModals: boolean;
}


const Quiz = () => {

  const [isModal, setIsModal] = useState(false);
  const { isModals } = useOutletContext<setBackground>();
  const authInfo = useSelector((state: RootState) => state.auth)
  const [myQuizList, setMyQuizList] = useState<Quiz[]>([]);
  const [deleteItem, setDeleteItem] = useState("");
  const { data, status, sendHostRequest } = useHostAxios();
  const dispatch = useDispatch()



  // 컴포넌트 분리로 삭제후 업데이트가 안돼서 강제로 사용
  const deleteQuizHandler = (quizId: string) => {
    setDeleteItem(quizId)
    console.log("삭제된 템플릿 번호",quizId);
  };


  useEffect(() => {
    // sendHostRequest({
    //   url: `/api/quiz/template/list?hostId=${authInfo.userId}`,
    // }).then(data =>{
    //   console.log(data);
      
    // })
    





    axios.get(`https://k8a707.p.ssafy.io/api/quiz/template/list?hostId=${authInfo.userId}`)
      .then(res => {
        console.log(res.data);
        const newQuizList = res.data;
        setMyQuizList(newQuizList);
        dispatch(authActions.selectIndex(0));
      });
  }, [deleteItem])

  const [open, setOpen] = useState(false);

  const handleAlertOpen = () => {
    setOpen(true);
  };

  const handleAlertClose = () => {
    setOpen(false);
  };


  

  return (
    <div className={styles.content} style={isModal || isModals ? { backgroundColor: "darkgray" } : {}}>
      <div className={styles.title}>내가 만든 퀴즈</div>
      <div className={styles.listColFrame}>
        {myQuizList.map((quiz, index) => (
          <HomeListCard key={index} menu={0} quiz={quiz} onDeleteQuiz={deleteQuizHandler}  />
        ))}
        <Modal isModal={isModal} setIsModal={setIsModal} />
        {/* <Link to={"/quiz/create"}> */}
        <Icon icon="material-symbols:add-circle-outline-rounded" className={styles.addIcon} onClick={() => setIsModal(!isModal)} />
        {/* </Link> */}
      </div>

  
    </div>
  );
};

export default Quiz;
