import React from 'react';
import styles from "./QuizOxTemplate.module.css"
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useState } from 'react';
const QuizOxTemplate = () => {

    const [quiz, setQuiz] = useState({
        question: "",
        answer: "",
        image: "",
    });



    const imageUploadHandler = async (event: any) => {
        const file = event.target.files[0];
        console.log(file);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('https://k8a707.p.ssafy.io/api/quiz/upload', formData);
            //   setQuiz({ ...quiz, image: response.data });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className={styles.content_title}>
                <input type="text" placeholder="질문을 입력하세요" />
            </div>

            <div className={styles.content_images} style={quiz.image ? { backgroundImage: `url(${quiz.image})`, backgroundSize: "contain", backgroundPosition: 'center center', backgroundRepeat: "no-repeat" } : {}}>
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
                <div className={styles.content_answer}>
                    <div className={styles.content_color} style={{ backgroundColor: "var( --select-two)" }}><div><Icon icon="material-symbols:circle-outline" /></div></div>
                    <div className={styles.content_input}><input type="text" value={"맞다"} disabled /></div>
                </div>

                <div className={styles.content_answer}>
                    <div className={styles.content_color} style={{ backgroundColor: "var(--select-one)" }}><div><Icon icon="ph:x-bold" /></div></div>
                    <div className={styles.content_input}><input type="text" value={"아니다"} disabled /></div>
                </div>

            </div>
        </>
    );
};

export default QuizOxTemplate;