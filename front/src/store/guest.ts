import { createSlice } from "@reduxjs/toolkit";

export interface GuestState {
    image: number;
    nickname: HTMLInputElement|null;
};

const guestInitialState:GuestState = {
    image: 0,
    nickname: null,
};

const guestSlice = createSlice({
    name: "guest",
    initialState: guestInitialState,
    reducers: {
        updateGuestImage: (state, actions) => {
            state.image = actions.payload;
        },
        updateGuestNickname: (state, actions) => {
            state.nickname = actions.payload;
        },
    }
});

export const guestActions = guestSlice.actions;
export default guestSlice.reducer;