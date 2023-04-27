import { createSlice } from "@reduxjs/toolkit";
import { setQuizSet } from "models/quiz";
import { setQuizItem } from "models/quiz";

const quizItem: setQuizItem ={
    quizType:"",
    quiz: "",
    quizUrl: "",
    answer: "",
    one: "",
    two:"",
    three: "",
    four: "",
    answerList: [],
    game: "",
    timer: 0
}


// 전역 로그인 데이터 기본 값 설정
const initialQuizSet: setQuizSet ={
    name: "",
    hostId: 0,
    quizList:[]
}


const quizSlice = createSlice({
name: "quiz",
initialState: initialQuizSet,
reducers:{

    addQuiz:(state,action)=>{
        state.quizList.push(action.payload);
    },
    removeQuiz:(state, action)=>{
        state.quizList=state.quizList.filter((it,index)=> index!==action.payload);
    }
}
})

// slice안에 있는 action들 뽑아내
export const quizAtions = quizSlice.actions;
// reducer 속성을 추출하여, 이를 해당 모듈의 기본 내보내기
export default quizSlice.reducer;



