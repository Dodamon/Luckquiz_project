import { createSlice } from "@reduxjs/toolkit";
import { Client } from "@stomp/stompjs";
import { GuestType, SocketPropsType } from "models/guest";
import { AppThunk } from "store";

const brokerURL = "ws://k8a707.p.ssafy.io/connect/quiz";
export const client = new Client({ brokerURL: brokerURL });

interface SocketState {
  client: Client;
  guestList: GuestType[];
}

const initialState: SocketState = {
  client: client,
  guestList: [{ sender: "", img: 0 }],
};

const socketSlice = createSlice({
  name: "socket",
  initialState: initialState,
  reducers: {
    connect: (state) => {
      // Connect
      client.onConnect = () => {
        console.log(`webSocket connected`);
      };
      client.onDisconnect = () => {
        alert(`webSocket disconnected`);
      };
      client.onWebSocketClose = () => {
        console.log("webSocket Closed");
      };
      client.activate();
    },

    // subscribe: (state, actions) => {
    //   console.log("아놔");
    //   const sender = {
    //     sender: actions.payload.name,
    //     img: actions.payload.img,
    //     type: "enter",
    //     roomId: 123,
    //   };

    //   const callback = async (res: any) => {
    //     if (res.body) {
    //       const data = JSON.parse(res.body)
    //       console.log('data: ', data)
    //       // console.log(`도착 message: ${res.body}`);
    //       // console.log(typeof res.body)
    //       // console.log(res.body[0]);
    //       console.log('1',state.guestList)
    //       state.guestList = data 
    //       console.log('2',state.guestList)
    //     } else {
    //       console.log("got empty message");
    //     }
    //   };

    //   const subscribeURL = `/topic/quiz/${actions.payload.subscribeURL}`;
    //   const senderObj = JSON.stringify(sender);
    //   if (client.connected) {
    //     console.log('3',state.guestList)
    //     client.subscribe(subscribeURL, callback, { sender: senderObj });
    //   }
    // },

    // Disconnect
    disconnect: (state) => {
      // const client = client;
      if (client) {
        client.deactivate();
        console.log("webSocket Disconnected");
      }
    },

    // Send message when enter
    sendEnterMessage: (state, actions) => {
      // const client = client;
      if (client) {
        client.publish({
          destination: "/app/enter",
          body: JSON.stringify({ sender: actions.payload.name, img: actions.payload.img, type: "enter" }),
        });
        console.log(`publish : send name - ${actions.payload.name} / send img - ${actions.payload.img}`);
      }
    },

    // Send message when submit
    sendAnswerMessage: (state, actions) => {
      if (client) {
        client.publish({
          destination: "/app/submit",
          body: JSON.stringify(actions.payload),
          // actions.payload로 API DOCS 에 써있는 sending message 정보 넣으면 됨
        });
      }
    },

    changeGuestList: (state, actions) => {
      state.guestList = actions.payload;

    },
  },
});

export const subscribeThunk = (socketProps: SocketPropsType): AppThunk =>
  async (dispatch) => {

    const callback = (res:any) =>{
      if (res.body) {
        const data = JSON.parse(res.body)
        console.log('data: ', data)
        // console.log(`도착 message: ${res.body}`);
        // console.log(typeof res.body)
        // console.log(res.body[0]);
        dispatch(socketActions.changeGuestList(data))
      } else {
        console.log("got empty message");
      }
    }

    try {
      const sender = {
        sender: socketProps.name,
        img: socketProps.img,
        type: "enter",
        roomId: 123,
      }
      const URL = `/topic/quiz/${socketProps.subscribeURL}`
      const Obj = JSON.stringify(sender);
      if(client.connected){
        client.subscribe(URL, callback, {sender: Obj})
      }
    } catch (err) {
      console.log(err)
    }
  };

export const socketActions = socketSlice.actions;
export default socketSlice.reducer;
