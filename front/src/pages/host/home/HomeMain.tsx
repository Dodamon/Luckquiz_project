import { Link, Outlet, OutletProps } from "react-router-dom";
import styles from "./HomeMain.module.css";
import mypage_logo from "assets/images/mypage_logo.png";
import { Icon } from "@iconify/react";
import SideMenuTab from "components/host/home/SideMenuTab";
import useHostAxios from "hooks/useHostAxios";
import { useDispatch } from "react-redux";
import { authActions } from "store/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Modal from "components/host/quiz/Modal";


interface Data {
  id: string;
  name: string;
  email: string;
  image_url: string;
  createdAt: string;
}

const HomeMain = () => {
  const dispatch = useDispatch();
  const { data, status, sendHostRequest } = useHostAxios();
  const [isModal, setIsModal] = useState(false);
  const quizInfo = useSelector((state:RootState) => state.quiz)
 useEffect(() => {
  sendHostRequest({
    url: `/api/auth/user/info`,
  });
}, []);

useEffect(() => {
  if (data) {
    dispatch(authActions.updateInfo({ nickname: data.name, userId: data.id, image_url: data.image_url }));
  }
}, [data]);

const testHandler= ()=>{
  setIsModal(!isModal);
  console.log(isModal);
  
  // axios.get(`https://k8a707.p.ssafy.io/api/quiz/template/info?templateId=${quizInfo.templateId}&hostId=${quizInfo.hostId}`).then(res=>{
  //   console.log(res);
    
  // })
}

  return (
    <div className={styles.background}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoImgContainer}>
            <img className={styles.logoImg} src={mypage_logo} alt="" />
          </div>
          LuckQuiz
        </div>
        <span className={styles.btn} onClick={testHandler}>
          <Icon icon="material-symbols:add-circle-outline-rounded"  className={styles.addIcon} />새 퀴즈 만들기
        </span>
      </div>
      
      <div className={`${styles[`container`]}`}>
        <div className={`${styles[`side`]}`}>
          <SideMenuTab />
        </div>
        
        <Outlet></Outlet>
        <Modal isModal={isModal} setIsModal={setIsModal} />
      </div>
   
    </div>
  );
};

export default HomeMain;
