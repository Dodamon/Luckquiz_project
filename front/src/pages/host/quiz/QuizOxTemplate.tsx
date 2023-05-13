import React from 'react';
import styles from "./QuizOxTemplate.module.css"
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { quizAtions } from 'store/quiz';
type pageNum = {
    num: number;
}
const QuizOxTemplate = ({ num }: pageNum) => {
    const dispatch = useDispatch();
    const quizList = useSelector((state: RootState) => state.quiz.quizList);
    const [quiz, setQuiz] = useState(quizList[num]);


    console.log("여기 왔습니니다.", num, quiz);
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
        console.log(file);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('https://k8a707.p.ssafy.io/api/quiz/upload', formData);
            setQuiz({ ...quiz, quizUrl: response.data });
        } catch (error) {
            console.error(error);
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
                <input type="text" value={quiz.question} onChange={questionHandler} placeholder="질문을 입력하세요" />
            </div>

            <div className={styles.content_images} style={quiz.quizUrl ? { backgroundImage: `url(${quiz.quizUrl})`, backgroundSize: "contain", backgroundPosition: 'center center', backgroundRepeat: "no-repeat" } : {}}>
                <div

                    className={!quiz.quizUrl ? styles['plus_font'] : styles['effect_font']}  ><div>
                        <label htmlFor="file-upload" className={styles.plus_comment}>
                            <Icon icon="ic:round-plus" />
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept=".jpg, .png"
                            onChange={imageUploadHandler}
                            style={{ display: "none" }}
                        />

                    </div>
                    <div>이미지 첨부하세요</div>
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