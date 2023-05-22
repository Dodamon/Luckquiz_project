import styles from "./MainLanding.module.css";
import EnterPin from "components/guest/EnterPin";
import { Mobile, Default } from "hooks/mediaQuery";
import Login from "components/login/Login";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useEffect } from "react";
import { useNavigate } from "react-router";


const MainLanding: React.FC = () => {
  const isLogined = useSelector((state:RootState)=> state.auth.isAuthenticated);
  const navigate = useNavigate()
  useEffect(()=>{
    isLogined && navigate("home");
  },[]);


  return (
      <div className={styles.container}>
        <EnterPin />
        <Default>
          <Login />
        </Default>
        <Mobile>
          <>
            <div className={styles.hostMobileTxt}>
              퀴즈 출제는 PC에서만 가능합니다.
            </div>
            <hr className={styles.border}/>
          </>
        </Mobile>
      </div>
  );
};

export default MainLanding;
