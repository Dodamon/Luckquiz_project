import kakao from "assets/images/kakao_logo.png";
import google from "assets/images/google_logo.png";
import styles from "./Login.module.css";

interface Provider {
  provider: string;
}

const socialLogin = (props: Provider) => {
  const { provider } = props;
  window.location.href.includes("local") ? console.log("local") : console.log("server");
  const location = window.location.href.includes("local") ? "http://localhost:3000" : process.env.REACT_APP_HOST;
  console.log(location);
  window.location.href = `${process.env.REACT_APP_HOST}/api/auth/oauth2/authorize/${provider}?redirect_uri=${location}/oauth/redirect`;
};

const Login = () => {
  return (
    <>
      <div className={styles.buttonContainer}>
        <div className={styles.hostTxt}>퀴즈 출제하러 가기</div>
        <hr className={styles.border} />
        <div className={styles.loginBtnWrapper}>
          <div
            className={styles.loginBtn}
            style={{ backgroundColor: "#FEE500" }}
            onClick={() => {
              socialLogin({ provider: "kakao" });
            }}
          >
            <img src={kakao} alt="" height={18} />
            <div className={styles.font}>카카오로 시작하기</div>
          </div>
          <div
            className={styles.loginBtn}
            style={{ backgroundColor: "#ffff" }}
            onClick={() => {
              socialLogin({ provider: "google" });
            }}
          >
            <img src={google} alt="" width={20} style={{ overflow: "hidden", objectFit: "cover" }} />
            <div className={styles.font}>구글로 시작하기</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
