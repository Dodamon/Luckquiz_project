import { createSlice } from "@reduxjs/toolkit";
// import { client } from "App";
import { Client } from "@stomp/stompjs";

const brokerURL = "ws://k8a707.p.ssafy.io/connect/quiz";
// const brokerURL = "http://k8a707.p.ssafy.io/connect/quiz";
// export const client = new Client({ brokerURL: brokerURL });

interface SocketState {
  client: Client | null;
}

const initialState: SocketState = {
  client: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState: initialState,
  reducers: {
    // client 생성과 함께 connect
    setSocketClient: (state, action) => {
      state.client = action.payload;
    },
    // 구독 요청
    subscribe: (state, action) => {
      const sender = {
        sender: action.payload.name,
        img: action.payload.img,
        type: "ENTER",
        roomId: action.payload.roomId,
      };

      const callback = function (res: any) {
        if (res.body) console.log(`도착 message: ${res.body}`);
        else console.log("got empty message");
      };

      const subscribeURL = `/topic/quiz/${action.payload.subscribeURL}`;
      // const senderObj = JSON.stringify(sender);
      if (state.client?.connected) {
        const subscribeId = state.client.subscribe(subscribeURL, callback, { ...sender });
        if (subscribeId !== null) {
          console.log("Subscription successful with ID:", subscribeId);
        }
        console.log("subscribe");
      }
    },
    // Send message when enter
    sendEnterMessage: (state, actions) => {
      // const client = state.client;
      if (state.client) {
        state.client.publish({
          destination: "/app/enter",
          body: JSON.stringify({ sender: actions.payload.name, img: actions.payload.img, type: "ENTER" }),
        });
        console.log(`publish : send name - ${actions.payload.name} / send img - ${actions.payload.img}`);
      }
    },

    // Send message when submit
    sendAnswerMessage: (state, actions) => {
      if (state.client) {
        state.client.publish({
          destination: "/app/submit",
          body: JSON.stringify(actions.payload),
          // actions.payload로 API DOCS 에 써있는 sending message 정보 넣으면 됨
        });
      }
    },
  },
  // reducers: {
  //   connect: (state) => {
  //     // Connect
  //     state.client.onConnect = () => {
  //       console.log(`webSocket connected`);
  //     };
  //     state.client.onDisconnect = () => {
  //       alert(`webSocket disconnected`);
  //     };
  //     state.client.onWebSocketClose = () => {
  //       console.log("webSocket Closed");
  //     };
  //     state.client.activate();
  //   },

  //   subscribe: (state, actions) => {
  //     console.log("아놔");
  //     const sender = {
  //       sender: actions.payload.name,
  //       img: actions.payload.img,
  //       type: "ENTER",
  //     };

  //     const callback = function (res: any) {
  //       if (res.body) console.log(`도착 message: ${res.body}`);
  //       else console.log("got empty message");
  //     };

  //     const subscribeURL = `/topic/quiz/${actions.payload.subscribeURL}`;
  //     // const senderObj = JSON.stringify(sender);
  //     if (state.client.connected) {
  //       state.client.subscribe(subscribeURL, callback, { ...sender });
  //       console.log("subscribe");
  //     }
  //   },

  //   // Disconnect
  //   disconnect: (state) => {
  //     // const client = state.client;
  //     if (state.client) {
  //       state.client.deactivate();
  //       console.log("webSocket Disconnected");
  //     }
  //   },

  //   // Send message when enter
  //   sendEnterMessage: (state, actions) => {
  //     // const client = state.client;
  //     if (state.client) {
  //       state.client.publish({
  //         destination: "/app/enter",
  //         body: JSON.stringify({ sender: actions.payload.name, img: actions.payload.img, type: "ENTER" }),
  //       });
  //       console.log(`publish : send name - ${actions.payload.name} / send img - ${actions.payload.img}`);
  //     }
  //   },

  //   // Send message when submit
  //   sendAnswerMessage: (state, actions) => {
  //     if (state.client) {
  //       state.client.publish({
  //         destination: "/app/submit",
  //         body: JSON.stringify(actions.payload),
  //         // actions.payload로 API DOCS 에 써있는 sending message 정보 넣으면 됨
  //       });
  //     }
  //   },
  // },
});

export const socketActions = socketSlice.actions;
export default socketSlice.reducer;
