import { Client, Stomp } from "@stomp/stompjs";
import { socketActions } from "store/webSocket";

export const WebSocketConnection = (props: { roomId: Number, dispatch: Function }) => {
  const { roomId, dispatch } = props;
  const client = new Client({
    brokerURL: "ws://k8a707.p.ssafy.io/connect/quiz",

    // connect시, 구독 시도 -> redux client 갱신
    onConnect: () => {
      console.log("Connected to WebSocket");
      // const sender = {
      //   sender: hostInfo.nickname,
      //   img: hostInfo.image_url,
      //   type: "ENTER",
      // };
      // const callback = function (res: any) {
      //   if (res.body) console.log(`도착 message: ${res.body}`);
      //   else console.log("got empty message");
      //   // dispatch(socketActions.setSocketClient(client));
      // };

      // const subscribeURL = `/topic/quiz/${roomId}`;
      // const senderObj = JSON.stringify(sender);
      // if (clientState?.connected) {
      // console.log("subscribe");
      // client.subscribe(subscribeURL, callback, { ...sender });
      dispatch(socketActions.setSocketClient(client));
      // }
    },
    onStompError: (frame) => {
      console.log("Broker reported error: " + frame.headers["message"]);
      console.log("Additional details: " + frame.body);
      dispatch(socketActions.setSocketClient(client));
    },
    onWebSocketClose: () => {
      console.log("WebSocket closed");
    },
  });
  client.activate();
};
