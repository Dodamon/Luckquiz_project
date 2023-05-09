import { createSlice } from "@reduxjs/toolkit";


// 전역 로그인 데이터 타입 설정
interface AuthState {
    isAuthenticated: boolean;
    userId: string;
    nickname: string;
    image_url: string;
    connected: boolean;
    choiceIndex: number;
    // quizType: string;
}


// 전역 로그인 데이터 기본 값 설정
const initialAuth: AuthState ={
    isAuthenticated: false,
    userId: "",
    nickname: "",
    image_url:"",
    connected: false,
    choiceIndex: 0,
    // quizType: ""
}

// Redux Toolkit에서 제공하는 함수 중 하나
// Redux의 reducer를 작성할 때 보일러플레이트 코드를 줄이고,
// 코드의 가독성과 유지보수성을 높이기 위해 사용
const authSlice = createSlice({
name: "auth",
initialState: initialAuth,
reducers:{

    login:(state, action)=>{
        state.isAuthenticated =true;
        sessionStorage.setItem("accessToken", action.payload.token);
    },
    logout:(state)=>{
        state.isAuthenticated = false;
        state.nickname = "";
        // sessionStorage.removeItem("accessToken")
    },
    updateInfo:(state, action)=>{
        state.nickname = action.payload.nickname;
        state.userId = action.payload.userId;
        state.image_url = action.payload.image_url;
    }
    ,
    selectIndex:(state, action)=>{
        state.choiceIndex=action.payload;
    },
    // selectQuizType:(state, action)=>{
    //     state.quizType=action.payload;
    // },
}
})

// slice안에 있는 action들 뽑아내
export const authActions = authSlice.actions;
// reducer 속성을 추출하여, 이를 해당 모듈의 기본 내보내기
export default authSlice.reducer;



