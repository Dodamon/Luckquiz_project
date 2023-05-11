import { createSlice } from "@reduxjs/toolkit";
import { Client } from "@stomp/stompjs";
import { getQuizItem } from "models/quiz";
import { GuestType, SocketPropsType } from "models/guest";

const brokerURL = "wss://k8a707.p.ssafy.io/connect/quiz";
export const client = new Client({ brokerURL: brokerURL });

interface SocketState {
  client: Client | null;
  pinNum: string;
  guestList: GuestType[];
  QuizItem: getQuizItem | null;
  getMessage: boolean;
}

const initialState: SocketState = {
  client: client,
  pinNum: "",
  guestList: [{ sender: "", img: 0 }],
  QuizItem: null,
  getMessage: false,
};

const socketSlice = createSlice({
  name: "socket",
  initialState: initialState,
  reducers: {
    // Send message when submit
    sendAnswerMessage: (state, actions) => {
      if (client) {
        console.log("publish");
        client.publish({
          destination: "/app/quiz/start",
          body: JSON.stringify(actions.payload),
          // actions.payload로 API DOCS 에 써있는 sending message 정보 넣으면 됨
        });
      }
    },
    updateGetMessage: (state, actions) => {
      state.getMessage = actions.payload
    },
    changeGuestList: (state, actions) => {
      state.guestList = actions.payload;
    },

    updatePinNum: (state, actions) => {
      state.pinNum = actions.payload;
    },

    getQuizItem: (state, actions) => {
      state.QuizItem = actions.payload;
      console.log(state.QuizItem);
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
      else console.log("got empty message");
    }
  };

  const sender = {
    type: "enter",
    roomId: socketProps.roomNum,
  };
  // const URL = `/topic/quiz/${pinNum}`;
  // const URL = `/topic/quiz/3670055`;

  const URL = socketProps.isHost ? `/topic/quiz/${socketProps.roomNum}` : `/queue/quiz/${socketProps.roomNum}/${socketProps.name}`;
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
