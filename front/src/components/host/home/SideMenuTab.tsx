import styles from "./SideMenuTab.module.css";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import profile_sample from "assets/images/profile_sample.png";

const SideMenuTab = () => {
  const { pathname } = useLocation()

  // menu[quiz, report] 선택에 따라 달라지는 탭 색깔을 url에 따라 별도지정.
  const bgcolor = pathname.includes('report') ? ['', "var(--side-bar)"] : ["var(--side-bar)",'']

  return (
    <div className={`${styles[`side-tab`]}`}>
      <div className={`${styles[`profile`]}`}>
        <img className={`${styles[`profile-img`]}`} src={profile_sample} alt="" />
        <div className={`${styles[`profile-name`]}`}>무지개꽃잎이</div>
      </div>
      <Link to={"/home"}>
        <div className={`${styles[`menu`]}`} style={{ backgroundColor: bgcolor[0] }}>
          <Icon icon="mdi:view-list-outline" />
          퀴즈
        </div>
      </Link>
      <Link to={"/home/report"}>
        <div className={`${styles[`menu`]}`} style={{ backgroundColor: bgcolor[1], borderRadius: "0px 0px 20px 20px" }}>
          <Icon icon="mdi:poll" />
          레포트
        </div>
      </Link>
    </div>
  );
};

export default SideMenuTab;