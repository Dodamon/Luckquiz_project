import React from 'react';
import styles from "./QuizOxTemplate.module.css"
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { quizAtions } from 'store/quiz';
import { useNavigate } from 'react-router-dom';
type pageNum = {
    num: number;
}
const QuizOxTemplate = ({ num }: pageNum) => {
    const dispatch = useDispatch();
    const quizList = useSelector((state: RootState) => state.quiz.quizList);
    const [quiz, setQuiz] = useState(quizList[num]);
    const navigate = useNavigate()
    const imageDeleteHandler = ()=>{
        const content = {...quiz, quizUrl:""};
        dispatch(quizAtions.contentsUpdate({ index: num, content: content }));
      }
    useEffect(() => {
        setQuiz(quizList[num]);
    }, [num, quizList]);


    useEffect(() => {
        const intervalId = setInterval(() => {
            const content = quiz;
            if (content.answer || content.question || content.quizUrl) {
                dispatch(quizAtions.contentsUpdate({ index: num, content: content }))
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [quiz, num, dispatch]);


    const imageUploadHandler = async (event: any) => {
        const file = event.target.files[0];

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${process.env.REACT_APP_HOST}/api/quiz/upload`, formData);
            setQuiz({ ...quiz, quizUrl: response.data });
        } catch (err) {
            navigate('/error', { state: { code:err}});
        }
    };

    const questionHandler = (e: any) => {
        setQuiz({ ...quiz, question: e.target.value });
    }

    const answerHandler = (answer: string) => {
        setQuiz({ ...quiz, answer: answer })
    }

    return (
        <>
            <div className={styles.content_title}>
                <input type="text" maxLength={25} value={quiz.question} onChange={questionHandler} placeholder="질문을 입력하세요" />
            </div>

            <div className={styles.content_images} style={quiz.quizUrl ? { backgroundImage: `url(${quiz.quizUrl})`, backgroundSize: "contain", backgroundPosition: 'center center', backgroundRepeat: "no-repeat" } : {}}>
                <div className={!quiz.quizUrl ? styles['plus_font'] : styles['effect_font']}  >      <div>
            <div className={styles.font_box}>
              <label htmlFor="file-upload" className={styles.plus_comment}>
                <Icon icon="ic:round-plus" />
              </label>

              {
               quiz.quizUrl&&<div className={styles.plus_comment}>
                  <Icon icon="ph:trash-bold" onClick={imageDeleteHandler} />
                </div>
              }

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
                <div className={styles.content_answer}>
                    <div className={styles.content_color} style={{ backgroundColor: "var( --select-two)" }}><div><Icon icon="material-symbols:circle-outline" /></div></div>
                    <div className={styles.content_input}><input type="text" value={"맞다"} disabled />
                        <div className={styles.checkbox} >{

                            quiz.answer === "o" ? <Icon className={styles.keepbox} icon="fluent-emoji-flat:check-mark-button" onClick={() => answerHandler("")} /> : <Icon icon="mdi:checkbox-blank-outline" className={styles.outbox} onClick={() => answerHandler("o")} />

                        }</div>
                    </div>
                </div>

                <div className={styles.content_answer} >
                    <div className={styles.content_color} style={{ backgroundColor: "var(--select-one)" }}><div><Icon icon="ph:x-bold" /></div></div>
                    <div className={styles.content_input}><input type="text" value={"아니다"} disabled />
                        <div className={styles.checkbox} >{

                            quiz.answer === "x" ? <Icon className={styles.keepbox} icon="fluent-emoji-flat:check-mark-button" onClick={() => answerHandler("")} /> : <Icon icon="mdi:checkbox-blank-outline" className={styles.outbox} onClick={() => answerHandler("x")} />

                        }</div> </div>
                </div>

            </div>
        </>
    );
};

export default QuizOxTemplate;