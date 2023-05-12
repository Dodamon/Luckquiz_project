import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { setQuizSet } from "models/quiz";





// 전역 로그인 데이터 기본 값 설정
const initialQuizSet: setQuizSet ={
    hostId: "",
    templateId: -1,
    isValid: false,
    quizList:[]
}

//{index: selectInfo.choiceType, gameType: gameType
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
    ,
    locationUpdate:(state, action)=>{
        state.quizList=action.payload;
    }, 
    chooseQuiz:(state, action)=>{
        
        state.quizList=action.payload;
    },
    gameTypeUpdate:(state, action)=>{
        const { index, gameType } = action.payload;
        state.quizList = produce(state.quizList, draftList => {
            draftList[index].game = gameType;
        });
    },
    quizTypeUpdate:(state, action)=>{
        const { index, type } = action.payload;
        state.quizList = produce(state.quizList, draftList => {
            draftList[index].quiz = type;
        });
    },
    emotionTypeUpdate:(state, action)=>{
        const { index, type } = action.payload;
        state.quizList = produce(state.quizList, draftList => {
            draftList[index].answer = type;
        });
    },
    quizTimeUpdate:(state, action)=>{
        const { index, time } = action.payload;
        state.quizList = produce(state.quizList, draftList => {
            draftList[index].timer = time;
        });
    },
    templateIdUpdate:(state, action)=>{
        console.log("맞잖아",action.payload);
        state.templateId = action.payload;
    },

    contentsUpdate:(state, action)=>{
        const { index, content } = action.payload;
        state.quizList = produce(state.quizList, draftList => {
            draftList[index]= content;
        });
    },

    receiveUpdate:(state, action)=>{
    console.log("디스패치 왔는디요",action.payload);
     state.hostId = action.payload.hostId; 
     state.templateId = !action.payload.templateId? state.templateId:action.payload.templateId; 
     state.quizList = action.payload.quizList; 
    //  state = action.payload;
    },
}
    
}
)

// slice안에 있는 action들 뽑아내
export const quizAtions = quizSlice.actions;
// reducer 속성을 추출하여, 이를 해당 모듈의 기본 내보내기
export default quizSlice.reducer;



