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
import { quizAtions } from "store/quiz";


export interface Quiz {
  name: string;
  templateId: string;
  isValid: boolean;
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
  const navigate = useNavigate()


  // 컴포넌트 분리로 삭제후 업데이트가 안돼서 강제로 사용
  const deleteQuizHandler = (quizId: string) => {
    setDeleteItem(quizId)
    console.log("삭제된 템플릿 번호", quizId);
  };


  useEffect(() => {
    console.log("이거다링", authInfo.userId);
    
    axios.get(`${process.env.REACT_APP_HOST}/api/quiz/template/list?hostId=${authInfo.userId}`)
      .then(res => {
        console.log("서버에서 바로받은 데이터", res.data);
        const newQuizList = res.data;
        console.log(newQuizList);
        

        const finishList = [...newQuizList].filter(it=> it.isValid==="true").sort((a: any, b: any) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          if (dateA < dateB) {
            return 1;
          }
          if (dateA > dateB) {
            return -1;
          }
          return 0;
        });
        const nonFinishList = [...newQuizList].filter(it=> it.isValid==="false").sort((a: any, b: any) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          if (dateA < dateB) {
            return 1;
          }
          if (dateA > dateB) {
            return -1;
          }
          return 0;
        });

        console.log(nonFinishList);
        console.log(finishList);
        

        setMyQuizList([...finishList, ...nonFinishList]);
        dispatch(authActions.selectIndex(0));
      }).catch(err =>{
        navigate('/error', { state: { code:err.response.status}});
      } 
      );
  }, [deleteItem, authInfo.userId])




  return (
    <div className={styles.content} style={isModal || isModals ? {zIndex:"0"}:{}}>
      <div className={styles.bgtools} style={isModal || isModals ? { backgroundColor:"rgba(0, 0, 0, 0.5)", backdropFilter: 'blur(3px)' } : {}} ></div>
      <div className={styles.listColFrame}  style={isModal || isModals ? {zIndex:"-2"}:{}} >
        {myQuizList.length === 0   ? <div  className={styles.empty_comment}>퀴즈 템플릿이 비어있습니다.</div> :
        
        myQuizList.map((quiz, index) => (
          <HomeListCard key={index} menu={0} quiz={quiz} onDeleteQuiz={deleteQuizHandler} />
        ))
        

   
        
        
        }
       
        {/* <Link to={"/quiz/create"}> */}
        <Icon icon="material-symbols:add-circle-outline-rounded" className={styles.addIcon} onClick={() => setIsModal(!isModal)} />
       
        {/* </Link> */}
      </div>
      <Modal isModal={isModal} setIsModal={setIsModal} />
    </div>
  );
};

export default Quiz;
