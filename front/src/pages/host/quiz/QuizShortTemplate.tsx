import React, { useState, useEffect } from "react";
import styles from "./QuizShortTemplate.module.css";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { quizAtions } from "store/quiz";
import { useNavigate } from "react-router-dom";
type pageNum = {
  num: number;
};
const QuizShortTemplate = ({ num }: pageNum) => {
  const dispatch = useDispatch();
  const quizList = useSelector((state: RootState) => state.quiz.quizList);
  const [quiz, setQuiz] = useState(quizList[num]);
  const navigate = useNavigate();
  useEffect(() => {
    setQuiz(quizList[num]);
  }, [num, quizList]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const content = quiz;
      if (
        content.question ||
        content.answerList.every((option) => option !== "") ||
        content.answer ||
        content.quizUrl ||  
        content.answerList
      ) {
        dispatch(quizAtions.contentsUpdate({ index: num, content: content }));
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [quiz]);

  const answerAddHandler = () => {
    if (quiz.answerList.length === 3) return;
    const newItem = [...quiz.answerList, ""];
    setQuiz({ ...quiz, answerList: newItem });
  };

  const imageUploadHandler = async (event: any) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${process.env.REACT_APP_HOST}/api/quiz/upload`, formData);
      setQuiz({ ...quiz, quizUrl: response.data });
    } catch (err) {
      console.log(err);
      navigate("/error", { state: { code: err } });
    }
  };

  const imageDeleteHandler = () => {
    const content = { ...quiz, quizUrl: "" };
    dispatch(quizAtions.contentsUpdate({ index: num, content: content }));
  };

  const questionHandler = (e: any) => {
    setQuiz({ ...quiz, question: e.target.value });
  };

  const handleChangeOption = (event: any, index: number) => {
    setQuiz({
      ...quiz,
      answerList: quiz.answerList.map((option, i) => (i === index ? event.target.value : option)),
    });
  };

  // const answerAddHandler = () => {
  //   if (quiz.answerList.length === 3) return;
  //   const newItem = [...quiz.answerList, ""];
  //   setQuiz({ ...quiz, answerList: newItem });
  // }

  const deleteAnswerHandler = (idx: number) => {
    const beforeAnswerList = quiz.answerList.filter((it, index) => {
      return index !== idx;
    });
    setQuiz({ ...quiz, answerList: beforeAnswerList });
  };

  return (
    <>
      <div className={styles.content_title}>
        <input
          type="text"
          maxLength={25}
          value={quiz.question}
          onChange={questionHandler}
          placeholder="질문을 입력하세요"
        />
      </div>

      <div
        className={styles.content_images}
        style={
          quiz.quizUrl
            ? {
                backgroundImage: `url(${quiz.quizUrl})`,
                backgroundSize: "contain",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
              }
            : {}
        }
      >
        <div className={!quiz.quizUrl ? styles["plus_font"] : styles["effect_font"]}>
          {" "}
          <div>
            <div className={styles.font_box}>
              <label htmlFor="file-upload" className={styles.plus_comment}>
                <Icon icon="ic:round-plus" />
              </label>

              {quiz.quizUrl && (
                <div className={styles.plus_comment}>
                  <Icon icon="ph:trash-bold" onClick={imageDeleteHandler} />
                </div>
              )}
            </div>
            <input
              id="file-upload"
              type="file"
              accept=".jpg, .png"
              onChange={imageUploadHandler}
              style={{ display: "none" }}
            />
          </div>
          <div>이미지를 첨부하세요 (선택)</div>
        </div>
      </div>

      <div className={styles.content_answerbox}>
        {quiz.answerList.map((it, index) => {
          return (
            <div className={styles.content_answer} key={index}>
              <div className={styles.content_color} style={{ backgroundColor: "var( --button-two)" }}>
                <div>
                  <Icon style={{ display: "block" }} icon="ic:round-menu" />
                </div>            
              </div>
              <div className={styles.content_input}>
                <input maxLength={10} type="text" value={it} onChange={(event) => handleChangeOption(event, index)} />
              </div>
              <div
                className={styles.content_add}
                style={index === 0 && quiz.answerList.length === 1 ? { visibility: "hidden" } : {}}
              >
                <Icon icon="ic:round-minus" onClick={() => deleteAnswerHandler(index)} style={{fontSize: "30px"}} />
              </div>
            </div>
          );
        })}
        {quiz.answerList.length !== 3 && (
          <div className={styles.add_btn}>
            <Icon icon="material-symbols:add-circle-outline-rounded" onClick={answerAddHandler} />
          </div>
        )}
      </div>
    </>
  );
};

export default QuizShortTemplate;
