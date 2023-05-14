import { useDispatch , useSelector} from "react-redux";
import styles from "./Logout.module.css";
import { useNavigate } from "react-router-dom";
import { authActions } from "store/auth";
import { RootState } from "store";

const Logout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const selector = useSelector((state: RootState) => state.auth);

  const logout = () => {
    // 프론트단에서 
    dispatch(authActions.logout())
    sessionStorage.removeItem("accessToken")

    // 백에도 api로 로그아웃 전달
    // apiLogout().then((response) => {
    //   // console.log(response)
    //   if (self.name != "reload") {
    //     self.name = "reload";
    //     self.location.reload();
    //   } else self.name = "";
    //   // logout 시 login 창으로
    //   navigate("/");
    // })
    // .catch((e) => {
    //   // console.log(e);
    // });


    if (sessionStorage.getItem("accessToken")===null) {
      console.log(sessionStorage.getItem("accessToken"))
      alert('로그아웃 성공')
      navigate('/')
    } else {
      console.log(sessionStorage.getItem("accessToken"))
      alert('로그아웃 실패')
    }
  }
  

  return (
    <div
      className={styles.logoutBtn}
      onClick={() => {
        logout();
      }}
    >
      로그아웃
    </div>
  );
};

export default Logout;
