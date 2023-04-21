import "./App.css";
import { Client } from "@stomp/stompjs";
import { useCallback, useEffect, useRef, useState } from "react";
// import WebSocket from "ws";
Object.assign(global, { WebSocket });

function App() {
  const [brokerURL, setBrokerURL] = useState("ws://localhost:8080/ws/connect");
  const [subscribeURL, setSubscribeURL] = useState("/topic/test/1");
  const [publishURL, setPublishURL] = useState("/app/test/message");
  const [message, setMessage] = useState("");
  const client = useRef();
  const connect = useCallback(() => {
    if (client.current) {
      client.current.deactivate();
    }
    client.current = new Client({
      brokerURL: brokerURL,
      onConnect: () => {
        console.log(`웹소켓 ${brokerURL}에 연결 되었습니다.`);
      },
      onDisconnect: () => {
        console.log("연결이 해제되었습니다.");
      },
    });
    client.current.activate();
  }, [brokerURL]);

  return (
    <div className="App">
      <div>웹소켓 주소 : </div>
      <input
        onChange={(e) => {
          setBrokerURL(e.target.value);
        }}
        defaultValue={brokerURL}
      ></input>
      <div className="flex_row">
        <div>상태 : {client.connected ? "연결됨" : "연결 안됨"}</div>
        <button onClick={connect}>연결하기</button>
      </div>

      <div className="input_box">
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (client.current) {
                console.log(e.target[0].value, " 에 연결하겠습니다.");
                client.current.subscribe(e.target[0].value, (res) => {
                  console.log(`도착 message : ${res}`);
                });
              } else {
                console.log("연결좀");
              }
            }}
          >
            <label htmlFor="구독할 주소">구독할 주소</label>
            <input
              id="구독할 주소"
              onChange={(e) => {
                setSubscribeURL(e.target.value);
              }}
              defaultValue={subscribeURL}
            ></input>
            <button>구독하기</button>
          </form>
        </div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (client.current) {
                client.current.publish({
                  destination: e.target[0].value,
                  body: e.target[1].value,
                });
                console.log(
                  "목적지 : ",
                  e.target[0].value,
                  " 내용 : ",
                  e.target[1].value
                );
              } else {
                console.log("연결좀");
              }
            }}
          >
            <label htmlFor="메시지 보낼 소켓 주소">메시지 보낼 주소</label>
            <input
              id="메시지 보낼 소켓 주소"
              onChange={(e) => {
                setPublishURL(e.target.value);
              }}
              defaultValue={publishURL}
            ></input>
            <label htmlFor="메시지">보낼 메시지</label>
            <input
              id="메시지"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              defaultValue={message}
            ></input>
            <button type="submit">메시지보내기</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
