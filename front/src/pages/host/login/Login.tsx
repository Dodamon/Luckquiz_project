import logo from "assets/images/logo.png";
import kakao from "assets/images/kakao_logo.png";
import google from "assets/images/google_logo.png";
import styles from "./Login.module.css";

interface Provider {
  provider: string;
}

const socialLogin = (props: Provider) => {
  const { provider } = props;
  // window.location.href = `api/oauth/oauth2/authorize/${provider}?redirect_uri=${redirect_uri}`
  window.location.href = `https://k8a707.p.ssafy.io/api/auth/oauth2/authorize/${provider}?redirect_uri=http://localhost:3000/oauth/redirect`
};


const Login = () => {
  return (
    <div className={styles.container}>
      <img src={logo} alt="" className={styles.logo}/>
      <div className={styles.buttonContainer}>
        <div className={styles.loginBtn} style={{ backgroundColor: "#FEE500" }} onClick={()=>{socialLogin({ provider: "kakao" })}}>
          <img src={kakao} alt="" height={18} />
          <div className={styles.font}>카카오로 시작하기</div>
        </div>
        <div className={styles.loginBtn} style={{ backgroundColor: "#ffff" }} onClick={()=>{socialLogin({ provider: "google" })}}>
          <img src={google} alt="" width={20} style={{overflow:"hidden", objectFit: "cover"}}/>
          <div className={styles.font}>구글로 시작하기</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
