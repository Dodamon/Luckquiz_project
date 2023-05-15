import React from 'react';
import styles from "./QuizFourTemplate.module.css"
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useDispatch } from 'react-redux';
import { quizAtions } from 'store/quiz';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
type pageNum = {
    num: number;
}
const QuizFourTemplate = ({ num }: pageNum) => {
    const dispatch = useDispatch();
    const quizList = useSelector((state: RootState) => state.quiz.quizList);
    const template = useSelector((state: RootState) => state.quiz)
    const [quiz, setQuiz] = useState(quizList[num]);



    console.log("여기 왔습니니다.", num, quiz);
    useEffect(() => {
        setQuiz(quizList[num]);
    }, [num, quizList]);

    const questionHandler = (e: any) => {
        setQuiz({ ...quiz, question: e.target.value });
    }

    useEffect(() => {
        const intervalId = setInterval(async () => {
            const content = quiz;
            if (content.answer || content.quizUrl || content.one || content.two || content.three || content.four || content.question) {
                dispatch(quizAtions.contentsUpdate({ index: num, content: content }))
                // const item = template;
                // const res = await axios.post("https://k8a707.p.ssafy.io/api/quiz/template/contents-create", item);                
            }
        }, 1000);
        return () => clearInterval(intervalId);


    }, [quiz, num, dispatch, template]);

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

    const answerInputHandler = (e: any, num: string) => {

        if (num === 'one') {
            setQuiz({ ...quiz, one: e.target.value })
        } else if (num === 'two') {
            setQuiz({ ...quiz, two: e.target.value })
        } else if (num === 'three') {
            setQuiz({ ...quiz, three: e.target.value })
        } else if (num === 'four') {
            setQuiz({ ...quiz, four: e.target.value })
        }

    }

    const answerHandler = (answer: string) => {
        setQuiz({ ...quiz, answer: answer })
    }


    return (
        <>
            <div className={styles.content_title}>
                <input type="text" maxLength={35} value={quiz.question} onChange={questionHandler} placeholder="질문을 입력하세요" />
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
                    <div className={styles.content_color} style={quiz.one ? { backgroundColor: "var(--select-one)" } : { backgroundColor: "var(--placeholder-text)" }}><div><Icon icon="material-symbols:circle-outline" /></div></div>
                    <div className={styles.content_input}><input type="text" value={quiz.one} onChange={(e) => answerInputHandler(e, "one")} /> <div className={styles.checkbox} style={!quiz.one ? { visibility: "hidden" } : {}}>{

                        quiz.answer === "one" ? <Icon className={styles.keepbox} icon="fluent-emoji-flat:check-mark-button" onClick={() => answerHandler("")} /> : <Icon icon="mdi:checkbox-blank-outline" className={styles.outbox} onClick={() => answerHandler("one")} />

                    }</div>  </div>
                </div>

                <div className={styles.content_answer} >
                    <div className={styles.content_color} style={quiz.two ? { backgroundColor: "var(--select-two)" } : { backgroundColor: "var(--placeholder-text)" }}><div><Icon icon="ph:triangle-bold" /></div></div>
                    <div className={styles.content_input}><input type="text" value={quiz.two} onChange={(e) => answerInputHandler(e, "two")} /> <div className={styles.checkbox} style={!quiz.two ? { visibility: "hidden" } : {}}>{

                        quiz.answer === "two" ? <Icon className={styles.keepbox} icon="fluent-emoji-flat:check-mark-button" onClick={() => answerHandler("")} /> : <Icon icon="mdi:checkbox-blank-outline" className={styles.outbox} onClick={() => answerHandler("two")} />

                    }</div> </div>
                </div>

                <div className={styles.content_answer} >
                    <div className={styles.content_color} style={quiz.three ? { backgroundColor: "var(--select-three)" } : { backgroundColor: "var(--placeholder-text)" }}><div><Icon icon="ph:x-bold" /></div></div>
                    <div className={styles.content_input}><input type="text" value={quiz.three} onChange={(e) => answerInputHandler(e, "three")} /> <div className={styles.checkbox} style={!quiz.three ? { visibility: "hidden" } : {}} >{

                        quiz.answer === "three" ? <Icon className={styles.keepbox} icon="fluent-emoji-flat:check-mark-button" onClick={() => answerHandler("")} /> : <Icon icon="mdi:checkbox-blank-outline" className={styles.outbox} onClick={() => answerHandler("three")} />

                    }</div>  </div>
                </div>

                <div className={styles.content_answer} >
                    <div className={styles.content_color} style={quiz.four ? { backgroundColor: "var(--select-four)" } : { backgroundColor: "var(--placeholder-text)" }}><div><Icon icon="material-symbols:square-outline-rounded" /></div></div>
                    <div className={styles.content_input}><input type="text" value={quiz.four} onChange={(e) => answerInputHandler(e, "four")} /> <div className={styles.checkbox} style={!quiz.four ? { visibility: "hidden" } : {}}>{

                        quiz.answer === "four" ? <Icon className={styles.keepbox} icon="fluent-emoji-flat:check-mark-button" onClick={() => answerHandler("")} /> : <Icon icon="mdi:checkbox-blank-outline" className={styles.outbox} onClick={() => answerHandler("four")} />

                    }</div> </div>
                </div>


            </div>
        </>
    );
};

export default QuizFourTemplate;