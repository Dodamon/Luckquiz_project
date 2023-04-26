import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./Report.module.css";
import { Icon } from "@iconify/react";
import profile_sample from "assets/images/profile_sample.png";
import report_bg from "assets/images/report_bg.png";

const Report = () => {

  return (
    <div className={`${styles[`container`]}`}>
    {/* <div className={`${styles[`container1`]}`}> */}
    <div className={`${styles[`side`]}`}>
      <div className={`${styles[`side-tab-box`]}`}>
        <div className={`${styles[`profile`]}`}>
          <img className={`${styles[`profile-img`]}`} src={profile_sample} alt="" />
          무지개꽃잎이
        </div>
        <Link to={"/home"}>
          <div className={`${styles[`menu`]}`}>
            <Icon icon="mdi:view-list-outline" />
            퀴즈
          </div>
        </Link>
        <Link to={"/home/report"}>
          <div className={`${styles[`menu`]}`} style={{ backgroundColor: "var(--side-bar)" }}>
            <Icon icon="mdi:poll" />
            레포트
          </div>
        </Link>
      </div>
    </div>
    {/* </div> */}
    <div className={`${styles[`content`]}`} style={{ backgroundImage: report_bg }}>
      <div className={`${styles[`title`]}`}>레포트</div>
    </div>
  </div>
  )
};

export default Report;
