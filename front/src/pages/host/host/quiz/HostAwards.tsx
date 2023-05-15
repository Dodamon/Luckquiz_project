import Podium from "components/common/Podium";
import { useParams } from "react-router-dom";
import styles from "./HostAwards.module.css";
import ButtonWithLogo from "components/common/ButtonWithLogo";
import { useState, useRef } from "react";
import QuizRanking from "components/quiz/QuizRanking";

const HostAwards = () => {
    const { quiz_id } = useParams();
      const [modalOn, SetModalOn] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    
  return (
    <div className={styles.container}>
      <Podium />
      <div className={styles.btn}>
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
      </div>
      <div onClick={() => SetModalOn((pre) => !pre)}>현재 전체 랭킹보기</div>
      {modalOn && <QuizRanking />}
    </div>
  );
};
export default HostAwards;
