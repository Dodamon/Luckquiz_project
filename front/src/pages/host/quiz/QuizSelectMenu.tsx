
import styles from "./QuizSelectMenu.module.css"
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from 'store';
import { quizAtions } from 'store/quiz';
import axios from "axios"


const QuizSelectMenu = () => {
    const selectInfo = useSelector((state: RootState) => state.auth.choiceIndex);
    const quizInfo = useSelector((state: RootState) => state.quiz.quizList);
    const template = useSelector((state: RootState) => state.quiz);

    const [selectedQuizOption, setSelectedQuizOption] = useState(quizInfo[selectInfo].quiz);
    const [selectedGameOption, setSelectedGameOption] = useState(quizInfo[selectInfo].game);
    const [selectedTimeOption, setSelectedTimeOption] = useState(quizInfo[selectInfo].timer);


    const dispatch = useDispatch();
    const quizTypeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedQuizOption(event.target.value);
        dispatch(quizAtions.quizTypeUpdate({ index: selectInfo, type: event.target.value }))
    };

    const gameTypeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGameOption(event.target.value);
        dispatch(quizAtions.gameTypeUpdate({ index: selectInfo, gameType: event.target.value }))
    };

    const quizTimeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTimeOption(parseInt(event.target.value));
        dispatch(quizAtions.quizTimeUpdate({ index: selectInfo, time: event.target.value }))
    };


    useEffect(() => {

        if (quizInfo[selectInfo]?.type === "game") {
            setSelectedGameOption(quizInfo[selectInfo].game);
            setSelectedTimeOption(quizInfo[selectInfo].timer);

        } else if (quizInfo[selectInfo]?.type === "quiz") {
            setSelectedQuizOption(quizInfo[selectInfo].quiz);
            setSelectedTimeOption(quizInfo[selectInfo].timer);
        }

    }, [quizInfo, selectInfo])

    const temporarySaveHandler = () => {
        // dispatch(quizAtions.contentsUpdate({ index: selectInfo, content: template }))
        console.log(template);
        
        axios.post("https://k8a707.p.ssafy.io/api/quiz/template/contents-create", template).then(res => {
            console.log(res);

        })

                
    }


    



    return (
        <nav className={styles.content_nav}>

            <div className={styles.nav_left}>

                {

                    quizInfo[selectInfo]?.type === "quiz" ? <select className={styles.select_form} value={selectedQuizOption} onChange={quizTypeHandler}>
                        <option value="four">사지선다</option>
                        <option value="ox">OX 선택</option>
                        <option value="text">주관식</option>
                    </select> : <select className={styles.select_form} value={selectedGameOption} onChange={gameTypeHandler}>
                        <option value="egg">emotion</option>
                        <option value="wakeup">wakeup</option>
                        <option value="balloon">balloon</option>
                    </select>

                }

                <select className={styles.select_form} value={selectedTimeOption} onChange={quizTimeHandler}>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                    <option value="60">60</option>
                </select>
            </div>

            <div className={styles.nav_right}>
                <div>
                    <div onClick={temporarySaveHandler}>임시저장</div>
                </div>
                <div>
                    <div  onClick={temporarySaveHandler}>저장</div><Icon icon="ic:round-log-out" />
                </div>
            </div>
        </nav>
    );
};

export default QuizSelectMenu;