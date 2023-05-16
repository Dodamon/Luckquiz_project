import styles from "./QuizSelectMenu.module.css";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { quizAtions } from "store/quiz";
import axios from "axios";
import { useNavigate } from "react-router";

const QuizSelectMenu = () => {
  const selectInfo = useSelector((state: RootState) => state.auth.choiceIndex);
  const quizInfo = useSelector((state: RootState) => state.quiz.quizList);
  const template = useSelector((state: RootState) => state.quiz);

  const [selectedQuizOption, setSelectedQuizOption] = useState(quizInfo[selectInfo].quiz);
  const [selectedGameOption, setSelectedGameOption] = useState(quizInfo[selectInfo].game);
  const [selectedTimeOption, setSelectedTimeOption] = useState(quizInfo[selectInfo].timer);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const quizTypeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedQuizOption(event.target.value);
    dispatch(quizAtions.quizTypeUpdate({ index: selectInfo, type: event.target.value }));
  };

  const gameTypeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGameOption(event.target.value);
    dispatch(quizAtions.gameTypeUpdate({ index: selectInfo, gameType: event.target.value }));
  };

  const quizTimeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeOption(parseInt(event.target.value));
    dispatch(quizAtions.quizTimeUpdate({ index: selectInfo, time: event.target.value }));
  };

  useEffect(() => {
    if (quizInfo[selectInfo]?.type === "game") {
      setSelectedGameOption(quizInfo[selectInfo].game);
      setSelectedTimeOption(quizInfo[selectInfo].timer);
    } else if (quizInfo[selectInfo]?.type === "quiz") {
      setSelectedQuizOption(quizInfo[selectInfo].quiz);
      setSelectedTimeOption(quizInfo[selectInfo].timer);
    }
  }, [quizInfo, selectInfo]);

  const temporarySaveHandler = () => {
    const quizList = template.quizList;
    const checkedList = quizList.map((it) => {
      if (it.type === "game") {
        // 게임 null 확인
        return it.game === ""
          ? { ...it, isValid: false }
          : it.game === "emotion" && !it.answer
          ? { ...it, isValid: false }
          : { ...it, isValid: true };
      } else if (it.type === "quiz") {
        // 사지선다 확인
        if (it.quiz === "four") {
          return !it.answer || !it.one || !it.two || !it.three || !it.four || !it.question
            ? { ...it, isValid: false }
            : { ...it, isValid: true };

          // 주관식 확인
        } else if (it.quiz === "text") {
          return it.answerList.length === 0 || !it.question ? { ...it, isValid: false } : { ...it, isValid: true };

          // ox 확인
        } else if (it.quiz === "ox") {
          return !it.answer || !it.question ? { ...it, isValid: false } : { ...it, isValid: true };
        }
      }
    });

    const isValid = checkedList.some((element) => element?.isValid === false);
    const saveData = { ...template, isValid: !isValid, quizList: checkedList };

    axios.post(`${process.env.REACT_APP_HOST}/api/quiz/template/contents-create`, saveData).then((res) => {
      console.log(res);
      navigate("/home", { replace: true });
    });
  };

  return (
    <nav className={styles.content_nav}>
      <div className={styles.nav_left}>
        {quizInfo[selectInfo]?.type === "quiz" ? (
          <select className={styles.select_form} value={selectedQuizOption} onChange={quizTypeHandler}>
            <option value="four">사지선다</option>
            <option value="ox">OX 선택</option>
            <option value="text">주관식</option>
          </select>
        ) : (
          <select className={styles.select_form} value={selectedGameOption} onChange={gameTypeHandler}>
            <option value="emotion">emotion</option>
            <option value="wakeup">wakeup</option>
            <option value="balloon">balloon</option>
          </select>
        )}

        <select className={styles.select_form} value={selectedTimeOption} onChange={quizTimeHandler}>
          {quizInfo[selectInfo]?.type === "game" && quizInfo[selectInfo]?.game === "emotion" ? (
            <>
              <option value="30">30초</option>
              <option value="45">45초</option>
              <option value="60">60초</option>
            </>
          ) : (
            <>
              <option value="15">15초</option>
              <option value="30">30초</option>
              <option value="45">45초</option>
              <option value="60">60초</option>
            </>
          )}
        </select>
      </div>

      <div className={styles.nav_right}>
        {/* <div>
                    <div onClick={temporarySaveHandler}>임시저장</div>
                </div> */}
        <div onClick={temporarySaveHandler}>
          <div>저장</div>
          <Icon style={{ marginLeft: "5px", fontWeight: "bold" }} icon="ic:round-log-out" />
        </div>
      </div>
    </nav>
  );
};

export default QuizSelectMenu;
