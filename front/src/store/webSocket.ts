import { createSlice } from "@reduxjs/toolkit";
import { Client } from "@stomp/stompjs";
import { GuestType } from "models/guest";
import { getQuizItem } from "models/quiz";

const brokerURL = "wss://k8a707.p.ssafy.io/connect/quiz";
export const client = new Client({ brokerURL: brokerURL });

interface SocketState {
  client: Client|null;
  pinNum: string;
  guestList: GuestType[];
  QuizItem: getQuizItem | null
}

const initialState: SocketState = {
  client: client,
  pinNum: "",
  guestList: [{ sender: "", img: 0 }],
  QuizItem: null,
};


// const initialState: SocketState = {
//   client: client,
//   guestList: [{ sender: "", img: 0 }],
// };

const socketSlice = createSlice({
  name: "socket",
  initialState: initialState,
  reducers: {
    // Send message when enter
    sendEnterMessage: (state, actions) => {
      if (client) {
        client.publish({
          destination: "/app/enter",
          body: JSON.stringify({ sender: actions.payload.name, img: actions.payload.img, type: "enter", roomId: "8345119" }),
        });
        console.log(`publish : send name - ${actions.payload.name} / send img - ${actions.payload.img}`);
      }
    },

    // Send message when submit
    sendAnswerMessage: (state, actions) => {
      if (client) {
        console.log('publish')
        client.publish({
          destination: "/app/quiz/start",
          body: JSON.stringify(actions.payload),
          // actions.payload로 API DOCS 에 써있는 sending message 정보 넣으면 됨
        });
      }
    },

    changeGuestList: (state, actions) => {
      state.guestList = actions.payload;
    },

    updatePinNum: (state, actions) => {
      state.pinNum = actions.payload;
    },

    getQuizItem: (state, actions) => {
      state.QuizItem = actions.payload
      console.log(state.QuizItem)
    }
  },

});

// connect 후에 subscribe까지 (비동기 처리)
export const connectAndSubscribe = (pinNum: string, dispatch:Function) => {
  client.onConnect = async () => {
    await subscribe(pinNum, dispatch);  
    console.log("socket connected")
  };
  client.onDisconnect = () => {
    console.log("socket Disconnected");
  };
  client.onWebSocketClose = () => {
    console.log("socket Closed")
  }
  client.activate();
};

const subscribe = async (pinNum: string, dispatch: Function) => {
  console.log("제발 subscribe 실행됐다고 해줘")
  const callback = (res: any) => {
    console.log(res.body)
    const data = JSON.parse(res.body);
    if (data.sender) {
      console.log("구독 메세지 data:", data);
      dispatch(socketActions.changeGuestList(data));
    } else if (data.qgame) {
      console.log("다음 게임:", data)
      dispatch(socketActions.getQuizItem(data))
    }
    else {
      console.log("got empty message");
    };
  };
  const sender = {
    type: "enter",
    roomId: "8345119",
  };
  // const URL = `/topic/quiz/${pinNum}`;
  const URL = `/topic/quiz/8345119`;
  const Obj = JSON.stringify(sender);
  client.subscribe(URL, callback, { sender: Obj });
};

// 퀴즈 끝났을 때 socket disconnect
export const disconnect = () => {
  client.deactivate();
};

export const socketActions = socketSlice.actions;
export default socketSlice.reducer;
