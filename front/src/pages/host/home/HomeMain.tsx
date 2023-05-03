import { Link, Outlet } from "react-router-dom";
import styles from "./HomeMain.module.css";
import mypage_logo from "assets/images/mypage_logo.png";
import { Icon } from "@iconify/react";
import SideMenuTab from "components/host/home/SideMenuTab";
import Logout from "components/common/Logout";

const HomeMain = () => {
  return (
    <div className={styles.background}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoImgContainer}>
            <img className={styles.logoImg} src={mypage_logo} alt="" />
          </div>
          LuckQuiz
        </div>
        <Link to={"/quiz/create"} className={styles.btn}>
          <Icon icon="material-symbols:add-circle-outline-rounded" className={styles.addIcon} />새 퀴즈 만들기
        </Link>
      </div>
      <div className={styles.container}>
      <div className={styles.side}>
        <SideMenuTab></SideMenuTab>
        <Logout></Logout>
      </div>
      <Outlet></Outlet>
    </div>

    </div>
  );
};

export default HomeMain;
