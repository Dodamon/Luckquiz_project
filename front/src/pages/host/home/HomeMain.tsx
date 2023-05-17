import { Link, Outlet, useNavigate, OutletProps} from "react-router-dom";
import styles from "./HomeMain.module.css";
import mypage_logo from "assets/images/mypage_logo.png";
import { Icon } from "@iconify/react";
import SideMenuTab from "components/host/home/SideMenuTab";
import useHostAxios from "hooks/useHostAxios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "store/auth";
import { useEffect, useState } from "react";
import { RootState } from "store";
import Modal from "components/host/quiz/Modal";
import { quizAtions } from "store/quiz";


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
  const [isModals, setIsModal] = useState(false);
  const isLogined = useSelector((state:RootState)=> state.auth.isAuthenticated);



  useEffect(()=>{
    !isLogined && navigate("/");
  },[]);

  useEffect(()=>{
    dispatch(quizAtions.resetUpdate())
  },[]);


const modalHandler= ()=>{
 setIsModal(!isModals);
}

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
        <span className={styles.btn} onClick={()=>modalHandler()} >
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
