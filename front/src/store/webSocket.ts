import { createSlice } from "@reduxjs/toolkit";
// import { client } from "App";
import { Client } from "@stomp/stompjs";

const brokerURL = "ws://localhost:8080/connect/quiz"
const client = new Client({brokerURL: brokerURL});

const socketSlice = createSlice({
  name: "socket",
  initialState: null,
  reducers: {
    connectAndSubscribe: (state, actions) => {
      // Connect
      client.onConnect = () => {
        console.log(`webSocket connected`);
      };
      client.onWebSocketClose = () => {
        console.log("webSocket Closed");
      };
      client.activate();
      const sender = {
        name: actions.payload.name,
        img: actions.payload.img,
        type: "ENTER"
      };
      // Subscribe
      const subscribeURL = `/topic/quiz/${actions.payload.subscribeURL}`;
      const senderObj = JSON.stringify(sender);
      client.subscribe(subscribeURL, (res) => {
        console.log(`도착 message: ${res.body}`);
      }, { ...sender });
    },

    // Disconnect
    disconnect: () => {
      if (client) {
        client.deactivate();
        console.log("webSocket Disconnected");
      }
    },

    // Send message when enter
    sendEnterMessage: (state, actions) => {
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
