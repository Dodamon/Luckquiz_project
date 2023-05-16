import Podium from "components/common/Podium";
import { useParams } from "react-router-dom";
import styles from "./Awards.module.css";
import ButtonWithLogo from "components/common/ButtonWithLogo";
import { useState, useRef, useEffect } from "react";
import QuizRanking from "components/quiz/QuizRanking";
import { RootState } from "store";
import { useSelector } from "react-redux";

const GuestAwards = () => {
  const { quiz_id } = useParams();
  const isHost = useSelector((state: RootState) => state.auth.isAuthenticated);

  const [modalOn, SetModalOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);


  useEffect(() => {
    function handleClickOutside(event:any) {
      if (ref.current && !ref.current.contains(event.target)) {
        SetModalOn(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  
  return (
    <div className={styles.container}  >
       {modalOn && <QuizRanking />}
      <Podium />
      { isHost && <div className={styles.btn}  style={ modalOn? { position: "relative", zIndex:"-1"}:{} } >
        <ButtonWithLogo
          name="퀴즈 종료"
          fontSize="18px"
          height="45px"
        //   onClick={() =>
        // dispatch(
        //   socketActions.sendAnswerMessage({
        //     destination: "/app/quiz/next",
        //     body: { hostId: userId, roomId: quiz_id },
        //   }),
        // )
        //   }  backdrop-filter: blur(5px); /* 흐림 효과 적용 */
        />
      </div>}
      <div  className={styles.bgtools} style={modalOn? {backgroundColor:"rgba(0, 0, 0, 0.5)", backdropFilter: 'blur(3px)'}: {}} ></div>
      <div ref={ref} className={styles.open_btn} onClick={() => SetModalOn((pre) => !pre)}>현재 전체 랭킹보기</div>
     
    </div>
  );
};
export default GuestAwards;
