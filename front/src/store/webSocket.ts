import { createSlice } from "@reduxjs/toolkit";
// import { client } from "App";
import { Client } from "@stomp/stompjs";

const brokerURL = "ws://localhost:8080/connect/quiz"
const client = new Client({brokerURL: brokerURL});

const socketSlice = createSlice({
  name: "socket",
  initialState: {client:new Client({brokerURL:"ws://localhost:8080/connect/quiz"}), connected: 0},
  reducers: {
    connectAndSubscribe: (state) => {
      const client = state.client;
      // Connect
      client.onConnect = () => {
        console.log(`webSocket connected`);
        state.connected = 1;
      };
      client.onWebSocketClose = () => {
        console.log("webSocket Closed");
      };
      client.activate();
      // const sender = {
      //   name: actions.payload.name,
      //   img: actions.payload.img,
      //   type: "ENTER"
      // };
      // // Subscribe
      // const subscribeURL = `/topic/quiz/${actions.payload.subscribeURL}`;
      // // const senderObj = JSON.stringify(sender);
      // client.subscribe(subscribeURL, (res) => {
      //   if (res.body) console.log(`도착 message: ${res.body}`);
      //   else console.log("got empty message")
      // }, { ...sender });
    },
    subscribe: (state, actions) => {
      const client = state.client;
      const sender = {
        name: actions.payload.name,
        img: actions.payload.img, 
        type: "ENTER"
      };
      // const subscribeURL = `/topic/quiz/${actions.payload.subscribeURL}`;
      // const senderObj = JSON.stringify(sender);
      client.subscribe(`/topic/quiz/${actions.payload.subscribeURL}`, (res) => {
        if (res.body) console.log(`도착 message: ${res.body}`);
        else console.log("got empty message")
      }, { ...sender });
    },
    // Disconnect
    disconnect: (state) => {
      const client = state.client
      if (client) {
        client.deactivate();
        console.log("webSocket Disconnected");
      }
    },

    // Send message when enter
    sendEnterMessage: (state, actions) => {
      const client = state.client;
      if (client) {
        client.publish({
          destination: "보낼 주소",
          body: JSON.stringify({})
        });
      }
    }
  },
});

export const socketActions = socketSlice.actions;
export default socketSlice.reducer;
