import Podium from "components/common/Podium";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Awards.module.css";
import ButtonWithLogo from "components/common/ButtonWithLogo";
import { useState, useRef, useEffect } from "react";
import QuizRanking from "components/quiz/QuizRanking";
import { RootState } from "store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { socketActions } from "store/webSocket";

const Awards = () => {
  const { quiz_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isHost = useSelector((state: RootState) => state.auth.isAuthenticated);

  const [modalOn, SetModalOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        SetModalOn(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container} >
      {modalOn && <QuizRanking />}
      <div className={styles.podium}>
        <Podium />
      </div>
      {isHost && (
        <ButtonWithLogo
          name="레포트 보러가기"
          fontSize="18px"
          height="45px"
          onClick={() => {
            dispatch(socketActions.resetSocket()); // 퀴즈 종료 -> 웹소켓에 저장된 퀴즈와 결과 데이터 삭제
            navigate("/home/report");
          }}
        />
      )}
      <div ref={ref} className={styles.open_btn} onClick={() => SetModalOn((pre) => !pre)}>
        현재 전체 랭킹보기
      </div>
    </div>
  );
};
export default Awards;
