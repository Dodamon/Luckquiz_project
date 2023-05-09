import React from 'react';
import styles from "./QuizFourTemplate.module.css"
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useDispatch } from 'react-redux';
import { quizAtions } from 'store/quiz';

type pageNum = {
    num: number;
}
const QuizFourTemplate = ({ num }: pageNum) => {
    const dispatch = useDispatch();
    const quizList = useSelector((state: RootState) => state.quiz.quizList);
    const template = useSelector((state: RootState)=> state.quiz)
    const [quiz, setQuiz] = useState(quizList[num]);



    console.log("여기 왔습니니다.", num, quiz);
    useEffect(() => {
        setQuiz(quizList[num]);
    }, [num, quizList]);

    const questionHandler = (e: any) => {
        setQuiz({ ...quiz, question: e.target.value });
    }

    useEffect(() => {
        const intervalId = setInterval(async() => {
            const content = quiz;
            if (content.answer||content.quizUrl || content.one || content.two || content.three || content.four || content.question) {
                dispatch(quizAtions.contentsUpdate({ index: num, content: content }))
                // const item = template;
                // const res = await axios.post("https://k8a707.p.ssafy.io/api/quiz/template/contents-create", item);                
            }
        }, 2000);
        return () => clearInterval(intervalId);

        
    }, [quiz, num,dispatch, template]);

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
                <input type="text" value={quiz.question} onChange={questionHandler} placeholder="질문을 입력하세요" />
            </div>

            <div className={styles.content_images} style={quiz.quizUrl ? { backgroundImage: `url(${quiz.quizUrl})`, backgroundSize: "contain", backgroundPosition: 'center center', backgroundRepeat: "no-repeat" } : {}}>
                <div className={styles.plus_font} ><div>
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
                <div className={styles.content_answer} onClick={() => answerHandler('one')} style={quiz.answer === 'one' ? { opacity: "70%" } : {}}>
                    <div className={styles.content_color} style={{ backgroundColor: "var(--select-one)" }}><div><Icon icon="material-symbols:circle-outline" /></div></div>
                    <div className={styles.content_input}><input type="text" value={quiz.one} onChange={(e) => answerInputHandler(e, "one")} /></div>
                </div>

                <div className={styles.content_answer} onClick={() => answerHandler('two')} style={quiz.answer === 'two' ? { opacity: "70%" } : {}}>
                    <div className={styles.content_color} style={{ backgroundColor: "var( --select-two)" }}><div><Icon icon="ph:triangle-bold" /></div></div>
                    <div className={styles.content_input}><input type="text" value={quiz.two} onChange={(e) => answerInputHandler(e, "two")} /></div>
                </div>

                <div className={styles.content_answer} onClick={() => answerHandler('three')} style={quiz.answer === 'three' ? { opacity: "70%" } : {}}>
                    <div className={styles.content_color} style={{ backgroundColor: "var( --select-three)" }}><div><Icon icon="ph:x-bold" /></div></div>
                    <div className={styles.content_input}><input type="text" value={quiz.three} onChange={(e) => answerInputHandler(e, "three")} /></div>
                </div>

                <div className={styles.content_answer} onClick={() => answerHandler('four')} style={quiz.answer === 'four' ? { opacity: "70%" } : {}}>
                    <div className={styles.content_color} style={{ backgroundColor: "var(--select-four)" }}><div><Icon icon="material-symbols:square-outline-rounded" /></div></div>
                    <div className={styles.content_input}><input type="text" value={quiz.four} onChange={(e) => answerInputHandler(e, "four")} /></div>
                </div>
            </div>
        </>
    );
};

export default QuizFourTemplate;