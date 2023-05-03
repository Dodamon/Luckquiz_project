import { createSlice } from "@reduxjs/toolkit";


// 전역 로그인 데이터 타입 설정
interface AuthState {
    isAuthenticated: boolean;
    userId: string;
    connected: boolean;
}


// 전역 로그인 데이터 기본 값 설정
const initialAuth: AuthState ={
    isAuthenticated: false,
    userId: "",
    connected: false,
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
        state.userId = action.payload.id;
        sessionStorage.setItem("accessToken", action.payload.token);
    },
    logout:(state)=>{
        state.isAuthenticated = false;
        state.userId = "";
        // sessionStorage.removeItem("accessToken")
        // 왜 안지워져 ;;
    }
}
})

// slice안에 있는 action들 뽑아내
export const authActions = authSlice.actions;
// reducer 속성을 추출하여, 이를 해당 모듈의 기본 내보내기
export default authSlice.reducer;



