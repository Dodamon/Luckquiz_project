import React, { useState } from 'react';
import styles from "./QuizShortTemplate.module.css"
import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import axios from 'axios';

const QuizShortTemplate = () => {

  const [quiz, setQuiz] = useState({
    question: "",
    answerList: [""],
    answer: "",
    image: "",
  });

  useEffect(() => {
    const intervalId = setInterval(() => {

      const { question, answerList, answer, image } = quiz;
      if (question || answerList.every((option) => option !== "") || answer || image) {
        console.log(quiz);
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [quiz]);

  const answerAddHandler = () => {
    if (quiz.answerList.length === 3) return;
    const newItem = [...quiz.answerList, ""];
    setQuiz({...quiz, answerList:newItem });
  }


  const imageUploadHandler = async (event:any) => {
    const file = event.target.files[0];
    console.log(file);
    
    const formData = new FormData();
    formData.append('file', file);
 
    try {
      const response = await axios.post('https://k8a707.p.ssafy.io/api/quiz/upload', formData);
      setQuiz({ ...quiz, image: response.data });
    } catch (error) {
      console.error(error);
    }
  };



  const questionHandler = (e: any)=>{
    setQuiz({ ...quiz, question: e.target.value });
  }

  const handleChangeOption = (event:any, index:number) => {
    setQuiz({
      ...quiz,
      answerList: quiz.answerList.map((option, i) =>
        i === index ? event.target.value : option
      ),
    });
  };
 
  return (
    <>
      <div className={styles.content_title}>
        <input type="text" value={quiz.question} onChange={questionHandler} placeholder="질문을 입력하세요" />
      </div>

      <div className={styles.content_images} style={quiz.image?{backgroundImage: `url(${quiz.image})`, backgroundSize: "contain",   backgroundPosition: 'center center',backgroundRepeat:"no-repeat" }:{}}>
        <div className={styles.plus_font} ><div>
        <label htmlFor="file-upload"   className={styles.plus_comment}>
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
        {
          quiz.answerList.map((it, index) => {
            return <div className={styles.content_answer} key={index}> <div className={styles.content_color} style={{ backgroundColor: "var( --button-two)" }}><div><Icon icon="ic:round-menu" /></div></div>
              <div className={styles.content_input}>
                <input type="text" value={it}  onChange={(event) => handleChangeOption(event, index)}/>
                </div>
              <div className={styles.content_add} onClick={answerAddHandler}><Icon icon="ic:round-plus" /></div></div>
          })
        }



      </div>
    </>
  );
};

export default QuizShortTemplate;