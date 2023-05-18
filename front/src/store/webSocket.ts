import { createSlice } from "@reduxjs/toolkit";
import { Client } from "@stomp/stompjs";
import { EmotionResult, FinalResultList, getQuizItem, SubmitAnswerResult } from "models/quiz";
import { GuestType, SocketPropsType } from "models/guest";
import { HostResult, GuestResult } from "models/quiz";

const brokerURL = "wss://k8a707.p.ssafy.io/connect/quiz";

export const client = new Client({ brokerURL: brokerURL });

interface SocketState {
  client: Client | null;
  pinNum: string;
  guestList: GuestType[] | null;
  quizItem: getQuizItem | null;
  getMessage: boolean;
  getEmotion: boolean;
  emotionResult: EmotionResult | null;
  quizEnd: string | null;
  getHostResult: HostResult[] | null;
  getGuestResult: GuestResult | null;
  getFinalResultList: FinalResultList[] | null;
  getSubmitAnswerResult: SubmitAnswerResult[] | null;
}

const initialState: SocketState = {
  client: client,
  pinNum: "",
  guestList: null,
  quizItem: null,
  getMessage: false,
  getEmotion: false,
  emotionResult: null,
  quizEnd: null,
  getHostResult: null,
  getGuestResult: null,
  getFinalResultList: null,
  getSubmitAnswerResult: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState: initialState,
  reducers: {
    // Send message when submit
    sendAnswerMessage: (state, actions) => {
      if (client) {
        console.log("publish");
        console.log(actions.payload.destination, actions.payload.body);
        client.publish({
          destination: actions.payload.destination,
          body: JSON.stringify(actions.payload.body),
          // actions.payload로 API DOCS 에 써있는 sending message 정보 넣으면 됨
        });
      }
    },

    // body 없는 publish
    sendRequest: (state, actions) => {
      if (client) {
        console.log("publish");
        client.publish({
          destination: actions.payload,
        });
      }
    },

    updateGetMessage: (state, actions) => {
      state.getMessage = actions.payload;
    },

    changeGuestList: (state, actions) => {
      state.guestList = actions.payload;
    },

    updatePinNum: (state, actions) => {
      state.pinNum = actions.payload;
      console.log(actions.payload);
    },

    getQuizItem: (state, actions) => {
      state.quizItem = actions.payload;
      state.quizEnd = null;
      console.log(state.quizItem);
    },

    quizEnd: (state) => {
      state.quizEnd = "success";
    },

    getEmotionResult: (state, actions) => {
      state.emotionResult = actions.payload;
    },

    getEmotionMessage: (state, actions) => {
      state.getEmotion = actions.payload;
    },

    getHostResult: (state, actions) => {
      state.getHostResult = actions.payload;
    },

    getGuestResult: (state, actions) => {
      state.getGuestResult = actions.payload;
    },

    getSubmitAnswerResult: (state, actions) => {
      state.getSubmitAnswerResult = actions.payload;
    },

    getFinalResultList: (state, actions) => {
      state.getFinalResultList = actions.payload;
    },

    resetSocket: (state) => {
      Object.assign(state, initialState);
    },
  },
});

// connect 후에 subscribe하고 enter 메시지 보내기 (비동기 처리)
export const connectAndSubscribe = (socketProps: SocketPropsType, dispatch: Function) => {
  client.onConnect = async () => {
    await subscribe(socketProps, dispatch);
    await sendEnterMessage(socketProps);
    await dispatch(socketActions.updateGetMessage(true));
    console.log("socket connected");
  };
  client.onDisconnect = () => {
    console.log("socket Disconnected");
  };
  client.onWebSocketClose = () => {
    console.log("socket Closed");
  };
  client.activate();
};

const subscribe = async (socketProps: SocketPropsType, dispatch: Function) => {
  console.log("제발 subscribe 실행됐다고 해줘");
  const callback = (res: any) => {
    if (res) {
      const data = JSON.parse(res.body);
      console.log("구독 메세지 data:", data);
      // message가 guestList일 때,
      if (data.type === "enterGuestList") dispatch(socketActions.changeGuestList(data.enterGuestList));
      else if (data.type === "getQuizItem") dispatch(socketActions.getQuizItem(data.getQuizItem));
      else if (data.type === "emotionResult") {
        dispatch(socketActions.getEmotionResult(data.emotionResult));
        dispatch(socketActions.getEmotionMessage(true));
      } else if (data.type === "quizEnd") { dispatch(socketActions.quizEnd()); dispatch(socketActions.getSubmitAnswerResult(data.quizEnd)) }
      // else if (data.type === "userList") dispatch(socketActions.getHostResult(data.userList));
      else if (data.type === "userLList") dispatch(socketActions.getHostResult(data.userLList));
      else if (data.type === "userTurnEndResponse") dispatch(socketActions.getGuestResult(data.userTurnEndResponse));
      else if (data.type === "finalResultList") dispatch(socketActions.getFinalResultList(data.finalResultList));
      else console.log("got empty message");
    }
  };

  const sender = {
    type: "enter",
    roomId: socketProps.roomNum,
  };

  const URL = socketProps.isHost
    ? `/topic/quiz/${socketProps.roomNum}`
    : `/queue/quiz/${socketProps.roomNum}/${socketProps.name}`;
  const Obj = JSON.stringify(sender);
  client.subscribe(URL, callback, { sender: Obj });
};

const sendEnterMessage = async (socketProps: SocketPropsType) => {
  if (client) {
    client.publish({
      destination: "/app/enter",
      body: JSON.stringify({
        sender: socketProps.name,
        img: socketProps.img,
        type: "enter",
        roomId: socketProps.roomNum,
      }),
    });
    console.log(`publish : send name - ${socketProps.name} / send img - ${socketProps.img}`);
  }
};

// 퀴즈 끝났을 때 socket disconnect
export const disconnect = () => {
  client.deactivate();
};

export const socketActions = socketSlice.actions;
export default socketSlice.reducer;
