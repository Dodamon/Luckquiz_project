
import styles from "./QuizSelectMenu.module.css"
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { authAtions } from "store/auth";
const QuizSelectMenu = () => {
    const [selectedQuizOption, setSelectedQuizOption] = useState('');
    const [selectedTimeOption, setSelectedTimeOption] = useState('');
    const dispatch = useDispatch();

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
            <select value={selectedQuizOption} onChange={quizTypeHandler}>
                <option value="four">사지선다</option>
                <option value="ox">OX 선택</option>
                <option value="text">주관식</option>
            </select>
            <select value={selectedTimeOption} onChange={quizTimeHandler}>
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