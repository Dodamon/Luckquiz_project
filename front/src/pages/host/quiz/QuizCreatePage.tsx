import styles from "./QuizCreatePage.module.css"
import QuizCreateLayout from "./QuizCreateLayout";
import GameCreateLayout from "./GameCreateLayout";
import QuizListBar from "./QuizListBar";
import { useSelector } from "react-redux";
import { RootState } from "store";
import EmptyContentPage from "./EmptyContentPage";



const QuizCreatePage: React.FC = () => {
    const quizInfo = useSelector((state: RootState) => state.quiz.quizList);
    const selectInfo = useSelector((state: RootState) => state.auth.choiceIndex);
    // console.log(quizInfo);

    return (
        <div className={styles.QuizCreate}>
            <section className={styles.left_side} >
                <QuizListBar />
            </section>

            <section className={styles.right_side} >

                {

                    quizInfo.length === 0 ? <EmptyContentPage /> : quizInfo[selectInfo]?.quizType === "게임" ? <GameCreateLayout /> : <QuizCreateLayout />

                }



            </section>
        </div>
    );
};

export default QuizCreatePage;