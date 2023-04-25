import { Outlet } from "react-router-dom";
import styles from "./HomeMain.module.css";
import mypage_logo from "assets/images/mypage_logo.png";
import { Icon } from '@iconify/react';


const HomeMain = () => {
  return (
    <div className={`${styles[`background`]}`}>
      <div className={`${styles[`header`]}`}>
        <div className={`${styles[`logo`]}`}>
          <div className={`${styles[`logo-img-container`]}`}>
            <img className={`${styles[`logo-img`]}`} src={mypage_logo} alt="" />
          </div>
          LuckQuiz
        </div>
        <button className={`${styles[`btn`]}`}><Icon icon="material-symbols:add-circle-outline-rounded" className={`${styles[`add-icon`]}`}/>새 퀴즈 만들기</button>
      </div>
      <div className={`${styles[`container`]}`}>

      <div className={`${styles[`side-tab`]}`}>
        <div className={`${styles[`side-tab-box`]}`}></div>
      </div>
      <div className={`${styles[`content`]}`}>

      <Outlet></Outlet>
      </div>
      </div>
    </div>
  );
};

export default HomeMain;
