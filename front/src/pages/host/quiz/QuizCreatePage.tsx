import styles from "./QuizCreatePage.module.css";
import QuizCreateLayout from "./QuizCreateLayout";
import GameCreateLayout from "./GameCreateLayout";
import QuizListBar from "./QuizListBar";
import { useSelector } from "react-redux";
import { RootState } from "store";
import EmptyContentPage from "./EmptyContentPage";
import { Default, Mobile } from "hooks/mediaQuery";
import OnlyPcMode from "components/host/quiz/OnlyPcMode";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { quizAtions } from "store/quiz";
import { useEffect, useState } from "react";

const QuizCreatePage: React.FC = () => {
  // const [quizInfo, setQuizInfo] = useState(useSelector((state: RootState) => state.quiz.quizList))
  const quizInfo = useSelector((state: RootState) => state.quiz.quizList);
  const authInfo = useSelector((state: RootState) => state.auth);
  const quizTemplateId = useSelector((state: RootState) => state.quiz.templateId);
  const navigate = useNavigate();
  const isLogined = useSelector((state:RootState)=> state.auth.isAuthenticated);
  useEffect(()=>{
    (!isLogined) && navigate("/");
  },[]);

  useEffect(()=>{
    (quizTemplateId===-1) && navigate("/home");
  },[]);
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = ""; // Chrome에서는 이 설정이 필요합니다.
    };

    const handlePopstate = (event: PopStateEvent) => {
      const shouldLeaveGame = window.confirm("게임에서 나가시겠습니까?");
      if (shouldLeaveGame) {
        // 게임을 나가는 로직을 여기에 추가하세요.
        // 예를 들어, 게임 상태를 초기화하거나 서버에 나가는 요청을 보낼 수 있습니다.
        // ...

        // 페이지를 벗어납니다.
        navigate(-1);
      } else {
        // 뒤로가기 동작을 취소합니다.
        window.history.pushState(null, "", window.location.pathname);
      }
    };

    // 브라우저 닫기 이벤트 처리
    window.addEventListener("beforeunload", handleBeforeUnload);

    // 뒤로가기 버튼 이벤트 처리
    window.addEventListener("popstate", handlePopstate);

    return () => {
      // 이벤트 리스너를 정리합니다.
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [navigate]);

  return (
    <>
      <Default>
        <div className={styles.QuizCreate}>
          <section className={styles.left_side}>
            <QuizListBar />
          </section>

          <section className={styles.right_side}>
            {quizInfo.length === 0 ? (
              <EmptyContentPage />
            ) : quizInfo[authInfo.choiceIndex]?.type === "game" ? (
              <GameCreateLayout />
            ) : (
              <QuizCreateLayout />
            )}
          </section>
        </div>
      </Default>
      <Mobile>
        <OnlyPcMode />
      </Mobile>
    </>
  );
};

export default QuizCreatePage;
