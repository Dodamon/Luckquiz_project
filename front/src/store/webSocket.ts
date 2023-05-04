import { createSlice } from "@reduxjs/toolkit";
// import { client } from "App";
import { Client } from "@stomp/stompjs";
const brokerURL = "ws://k8a707.p.ssafy.io/connect/quiz";
export const client = new Client({brokerURL: brokerURL});

interface SocketState {
  client: Client,
};

const initialState: SocketState = {
  client: client,
};

const socketSlice = createSlice({
  name: "socket",
  initialState: initialState,
  reducers: {
    connect: (state) => {
      // Connect
      client.onConnect = () => {
        console.log(`webSocket connected`);
        // state.connected = true;
      };
      client.onWebSocketClose = () => {
        console.log("webSocket Closed");
      };
      client.activate();
    },

    subscribe: (state, actions) => {
      console.log("아놔")
      // const client = state.client;
      const sender = {
        sender: actions.payload.name,
        img: actions.payload.img, 
        type: "ENTER"
      };

      const callback = function(res:any){
        if (res) console.log(`도착 message: ${res}`);
        else console.log("got empty message");
      };

      const subscribeURL = `/topic/quiz/${actions.payload.subscribeURL}`;
      // const senderObj = JSON.stringify(sender);
      if (client.connected) {
        client.subscribe(subscribeURL, 
        callback, 
        { ...sender });
        console.log("subscribe");
      };
    },

    // Disconnect
    disconnect: (state) => {
      // const client = state.client;
      if (client) {
        client.deactivate();
        console.log("webSocket Disconnected");
      }
    },
    
    // Send message when enter
    sendEnterMessage: (state, actions) => {
      // const client = state.client;
      if (client) {
        client.publish({
          destination: "/app/enter",
          body: JSON.stringify({sender: actions.payload.name, img: actions.payload.img, type: "ENTER"})
        });
        console.log(`publish : send name - ${actions.payload.name} / send img - ${actions.payload.img}`);
      };
    },

    // Send message when submit
    sendAnswerMessage: (state, actions) => {
      if (client) {
        client.publish({
          destination: "/app/submit",
          body: JSON.stringify(actions.payload),
          // actions.payload로 API DOCS 에 써있는 sending message 정보 넣으면 됨
        });
      };
    }
  },
});

export const socketActions = socketSlice.actions;
export default socketSlice.reducer;
