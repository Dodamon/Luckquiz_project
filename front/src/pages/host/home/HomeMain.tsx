import { Link, Outlet } from "react-router-dom";
import styles from "./HomeMain.module.css";
import mypage_logo from "assets/images/mypage_logo.png";
import { Icon } from "@iconify/react";
import SideMenuTab from "components/host/home/SideMenuTab";
import useHostAxios from "hooks/useHostAxios";
import { useDispatch } from "react-redux";
import { authActions } from "store/auth";
import { useEffect, useState } from "react";

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
      <div className={`${styles[`container`]}`}>
        <div className={`${styles[`side`]}`}>
          <SideMenuTab />
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default HomeMain;
