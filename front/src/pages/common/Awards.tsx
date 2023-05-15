import Podium from "components/common/Podium";
import { useParams } from "react-router-dom";
import styles from "./Awards.module.css";
import ButtonWithLogo from "components/common/ButtonWithLogo";
import { useState, useRef } from "react";
import QuizRanking from "components/quiz/QuizRanking";
import { RootState } from "store";
import { useSelector } from "react-redux";

const GuestAwards = () => {
  const { quiz_id } = useParams();
  const isHost = useSelector((state: RootState) => state.auth.isAuthenticated);

  const [modalOn, SetModalOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.container}>
      <Podium />
      { isHost && <div className={styles.btn}>
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
        //   }
        />
      </div>}
      <div onClick={() => SetModalOn((pre) => !pre)}>현재 전체 랭킹보기</div>
      {modalOn && <QuizRanking />}
    </div>
  );
};
export default GuestAwards;
