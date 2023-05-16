import { Link, Outlet, useNavigate, OutletProps} from "react-router-dom";
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
  const navigate = useNavigate()
  // const { data, status, sendHostRequest } = useHostAxios();
  const [isModals, setIsModal] = useState(false);
  const quizInfo = useSelector((state:RootState) => state.quiz)
  const authInfo = useSelector((state:RootState) => state.auth)
//  useEffect(() => {
//   sendHostRequest({
//     url: `/api/auth/user/info`,
//   });
// }, []);

// useEffect(() => {
//   if (data) {
//     dispatch(authActions.updateInfo({ nickname: data.name, userId: data.id, image_url: data.image_url }));
//   }
// }, [data]);

const testHandler= ()=>{
 setIsModal(!isModals);
}
// console.log(quizInfo.templateId,  authInfo.userId);
  
// axios.get(`https://k8a707.p.ssafy.io/api/quiz/template/info?templateId=${26}&hostId=${authInfo.userId}`).then(res=>{
//   console.log(res);
  
// })
  return (
    <div className={styles.background} style={isModals ? {zIndex:"0"}:{}}>
       <div className={styles.bgtools} style={isModals ? { backgroundColor:"rgba(0, 0, 0, 0.5)", backdropFilter: 'blur(3px)', zIndex:'3' } : {}} ></div>
      <div className={styles.header}>
        <div className={styles.logo} onClick={()=>{navigate('/home')}}>
          <div className={styles.logoImgContainer}>
            <img className={styles.logoImg} src={mypage_logo} alt="" />
          </div>
          LuckQuiz
        </div>
        <span className={styles.btn} onClick={()=>testHandler()} >
          <Icon icon="material-symbols:add-circle-outline-rounded"  className={styles.addIcon} />새 퀴즈 만들기
        </span>
      </div>
      
      <div className={`${styles[`container`]}`}>
        <div className={`${styles[`side`]}`}>
          <SideMenuTab />
        </div>
        
        <Outlet context={{isModals}}></Outlet>
        <Modal isModal={isModals} setIsModal={setIsModal} />
      </div>
   
    </div>
  );
};

export default HomeMain;
