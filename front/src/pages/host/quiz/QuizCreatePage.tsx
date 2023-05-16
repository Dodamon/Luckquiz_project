import styles from "./QuizCreatePage.module.css";
import QuizCreateLayout from "./QuizCreateLayout";
import GameCreateLayout from "./GameCreateLayout";
import QuizListBar from "./QuizListBar";
import { useSelector } from "react-redux";
import { RootState } from "store";
import EmptyContentPage from "./EmptyContentPage";
import { Default, Mobile } from "hooks/mediaQuery";
import OnlyPcMode from "components/host/quiz/OnlyPcMode";

const QuizCreatePage: React.FC = () => {
  // const [quizInfo, setQuizInfo] = useState(useSelector((state: RootState) => state.quiz.quizList))
  const quizInfo = useSelector((state: RootState) => state.quiz.quizList);
  const authInfo = useSelector((state: RootState) => state.auth);

  console.log(quizInfo);
  console.log(authInfo.choiceIndex);
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
        <OnlyPcMode/>
      </Mobile>
    </>
  );
};

export default QuizCreatePage;
