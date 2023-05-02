import { createSlice } from "@reduxjs/toolkit";
// import { client } from "App";
import { Client } from "@stomp/stompjs";

const brokerURL = "ws://localhost:8080/connect/quiz";
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
      state.client.onConnect = () => {
        console.log(`webSocket connected`);
        // state.connected = true;
      };
      state.client.onWebSocketClose = () => {
        console.log("webSocket Closed");
      };
      state.client.activate();
    },

    subscribe: (state, actions) => {
      console.log("아놔")
      // const client = state.client;
      const sender = {
        name: actions.payload.name,
        img: actions.payload.img, 
        type: "ENTER"
      };

      const callback = function(res:any){
        if (res.body) console.log(`도착 message: ${res.body}`);
        else console.log("got empty message");
      };

      const subscribeURL = `/topic/quiz/${actions.payload.subscribeURL}`;
      // const senderObj = JSON.stringify(sender);
      if (state.client.connected) {
        state.client.subscribe(subscribeURL, 
        callback, 
        { ...sender });
        console.log("subscribe");
      };
    },
    // Disconnect
    disconnect: (state) => {
      // const client = state.client;
      if (state.client) {
        state.client.deactivate();
        console.log("webSocket Disconnected");
      }
    },

    // Send message when enter
    sendEnterMessage: (state, actions) => {
      // const client = state.client;
      if (state.client) {
        state.client.publish({
          destination: "/app/enter",
          body: JSON.stringify({name: actions.payload.name, img: actions.payload.img, type: "ENTER"})
        });
        console.log("publish" + actions.payload.name + ' ' + actions.payload.img);
      }
    }
  },
});

export const socketActions = socketSlice.actions;
export default socketSlice.reducer;
