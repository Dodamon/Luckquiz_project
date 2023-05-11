import styles from "./QuizCreatePage.module.css"
import QuizCreateLayout from "./QuizCreateLayout";
import GameCreateLayout from "./GameCreateLayout";
import QuizListBar from "./QuizListBar";
import { useSelector } from "react-redux";
import { RootState } from "store";
import EmptyContentPage from "./EmptyContentPage";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useDispatch } from "react-redux";
import { quizAtions } from "store/quiz";
import { useEffect } from "react";



const QuizCreatePage: React.FC = () => {
    const quizInfo = useSelector((state: RootState) => state.quiz.quizList);
    const authInfo = useSelector((state: RootState) => state.auth);

    const params = useParams();
    const quiz_id = params.quiz_id;

    const dispatch = useDispatch();

    useEffect(()=>{
        if(quiz_id){
            axios.get(`https://k8a707.p.ssafy.io/api/quiz/template/info?templateId=${quiz_id}&hostId=${authInfo.userId}`).then(res=>{
                console.log("아놔 여긴데~",res.data);
                const data= res.data;
                dispatch(quizAtions.receiveUpdate(data));
              })
    
        }
    },[])


    
    
    console.log(quizInfo);
    console.log(authInfo.choiceIndex);
    return (
        <div className={styles.QuizCreate}>
            <section className={styles.left_side} >
                <QuizListBar />
            </section>

            <section className={styles.right_side} >
                {
                    quizInfo.length === 0 ? <EmptyContentPage /> : quizInfo[authInfo.choiceIndex]?.type === "game" ? <GameCreateLayout /> : <QuizCreateLayout />
                }
            </section>
        </div>
    );
};

export default QuizCreatePage;