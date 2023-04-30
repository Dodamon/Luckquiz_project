
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import styles from "./QuizSelectMenu.module.css"
import Box from '@mui/material/Box';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { authAtions } from "store/auth";
import { useSelector } from 'react-redux';
import { RootState } from 'store';
const QuizSelectMenu = () => {
    const [selectedQuizOption, setSelectedQuizOption] = useState('');
    const [selectedTimeOption, setSelectedTimeOption] = useState('');

    const authInfo = useSelector((state: RootState) => state.auth);
    const quizInfo = useSelector((state: RootState) => state.quiz);


    const dispatch = useDispatch();
    const [age, setAge] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    const quizTypeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedQuizOption(event.target.value);
        console.log(event.target.value);
        dispatch(authAtions.selectQuizType(event.target.value))

    };

    const quizTimeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTimeOption(event.target.value);
        console.log(event.target.value);
    };




    return (
        <nav className={styles.content_nav}>

            <div className={styles.nav_left}>

                {

                    quizInfo.quizList[authInfo.choiceType]?.quizType === "퀴즈" ? <select className={styles.select_form} value={selectedQuizOption} onChange={quizTypeHandler}>
                        <option value="four">사지선다</option>
                        <option value="ox">OX 선택</option>
                        <option value="text">주관식</option>
                    </select> : <select className={styles.select_form} value={selectedQuizOption} onChange={quizTypeHandler}>
                        <option value="emotion">감정 셀카 게임</option>
                        <option value="wakeup">쿼카야 일어나 게임</option>
                        <option value="text">주관식</option>
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