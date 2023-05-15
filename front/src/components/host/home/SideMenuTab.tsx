import styles from "./SideMenuTab.module.css";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import profile_sample from "assets/images/profile_sample.png";
import { useSelector } from "react-redux";
import { RootState } from "store";

const SideMenuTab = () => {
  const { pathname } = useLocation()
  const userInfo = useSelector((state: RootState)=>state.auth)

  // menu[quiz, report] 선택에 따라 달라지는 탭 색깔을 url에 따라 별도지정.
  const bgcolor = pathname.includes('report') ? ['', "var(--side-bar)"] : ["var(--side-bar)",'']

  return (
    <div className={styles.sideTab}>
      <div className={styles.profile}>
          <div  className={styles.profil_box}>
        <img className={styles.profileImg} src={userInfo.image_url} alt="" />
        <div className={styles.profileRight}>
          <div className={styles.profileBoard}>MANAGER</div>
        <div className={styles.profileName}>{userInfo.nickname}</div>
        </div>
        </div>
      </div>
      <Link to={"/home"}>
        <div className={styles.menu} style={{ backgroundColor: bgcolor[0] }}>
          <Icon icon="mdi:view-list-outline" style={{color:"orange"}}/>
          퀴즈
        </div>
      </Link>
      <Link to={"/home/report"}>
        <div className={styles.menu} style={{ backgroundColor: bgcolor[1], borderRadius: "0px 0px 20px 20px" }}>
          <Icon icon="mdi:poll" style={{color:"green"}} />
          레포트
        </div>
      </Link>
    </div>
  );
};

export default SideMenuTab;