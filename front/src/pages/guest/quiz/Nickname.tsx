import React from "react";
import styles from "./Nickname.module.css"
import { Desktop, Tablet, Mobile, Default } from "hooks/mediaQuery";
import logo from "assets/images/logo.png";
import ProfileNickname from "components/guest/ProfileNickname";

const Nickname:React.FC = () => {
  
  return (
    <>
      <Default>
        <div className={styles.defaultMode}>
          <img src={logo} alt="" className={styles.defaultLogo}/>
          <ProfileNickname />
        </div>
      </Default>
      <Mobile>
        <div className={styles.mobileMode}>
          <img src={logo} alt="" className={styles.mobileLogo}/>
          <ProfileNickname />
        </div>
      </Mobile>
    </>
  );
};

export default Nickname;