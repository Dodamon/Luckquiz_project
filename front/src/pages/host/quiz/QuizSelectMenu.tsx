
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import styles from "./QuizSelectMenu.module.css"
import Box from '@mui/material/Box';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { authAtions } from "store/auth";
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useEffect } from 'react';
import { quizAtions } from 'store/quiz';
const QuizSelectMenu = () => {
    const selectInfo = useSelector((state: RootState) => state.auth.choiceIndex);
    const quizInfo = useSelector((state: RootState) => state.quiz.quizList);
    const [selectedQuizOption, setSelectedQuizOption] = useState(quizInfo[selectInfo].quiz);
    const [selectedGameOption, setSelectedGameOption] = useState(quizInfo[selectInfo].game);
    const [selectedTimeOption, setSelectedTimeOption] = useState(quizInfo[selectInfo].timer);
    console.log(selectInfo);
    console.log(quizInfo);
    
    
    const dispatch = useDispatch();


    const quizTypeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedQuizOption(event.target.value);
        console.log(event.target.value);
        dispatch(quizAtions.quizTypeUpdate({index: selectInfo, quizType: event.target.value}))
    };

    const gameTypeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGameOption(event.target.value);
        console.log(event.target.value);
        dispatch(quizAtions.gameTypeUpdate({index: selectInfo, gameType: event.target.value}))
    };

    const quizTimeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTimeOption(parseInt(event.target.value));
        console.log(event.target.value);
        dispatch(quizAtions.quizTimeUpdate({index: selectInfo, time: event.target.value}))
    };


    useEffect(()=>{

        if(quizInfo[selectInfo]?.quizType==="게임"){
            setSelectedGameOption(quizInfo[selectInfo].game);
            setSelectedTimeOption(quizInfo[selectInfo].timer);

        }else if(quizInfo[selectInfo]?.quizType==="퀴즈"){
            setSelectedQuizOption(quizInfo[selectInfo].quiz);
            setSelectedTimeOption(quizInfo[selectInfo].timer);
            // dispatch(quizAtions.gameTypeUpdate({index: selectInfo, quizType: selectedQuizOption}))
            // dispatch(quizAtions.quizTimeUpdate({index: selectInfo, time: selectedTimeOption}))
        }
      
    }, [quizInfo, selectInfo])





    return (
        <nav className={styles.content_nav}>

            <div className={styles.nav_left}>

                {

                    quizInfo[selectInfo]?.quizType === "퀴즈" ? <select className={styles.select_form} value={selectedQuizOption} onChange={quizTypeHandler}>
                        <option value="four">사지선다</option>
                        <option value="ox">OX 선택</option>
                        <option value="text">주관식</option>
                    </select> : <select className={styles.select_form} value={selectedGameOption} onChange={gameTypeHandler}>
                        <option value="emotion">감정 셀카 게임</option>
                        <option value="wakeup">쿼카야 일어나 게임</option>
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
                    <div>임시저장</div>
                </div>
                <div>
                    <div>저장</div><Icon icon="ic:round-log-out" />
                </div>
            </div>
        </nav>
    );
};

export default QuizSelectMenu;