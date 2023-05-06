package com.luckquiz.quizroom.config;


import org.springframework.messaging.converter.StringMessageConverter;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;

public class MyStompSessionHandler extends StompSessionHandlerAdapter {
    private final String sender;

    public MyStompSessionHandler(String sender) {
        this.sender = sender;
    }

    @Override
    public void afterConnected(StompSession session, StompHeaders connectedHeaders) {
        session.subscribe("/user/" + sender + "/queue/private", this);
    }

    public void sendMessage(String message) throws Exception{
        StompSession session = connect("wss://k8a707.p.ssafy.io/connect/quiz").get();
        session.send("/app/quiz/private/" + sender, message);
        session.disconnect();
    }

    public ListenableFuture<StompSession> connect(String url) {
        WebSocketClient webSocketClient = new StandardWebSocketClient();
        WebSocketStompClient stompClient = new WebSocketStompClient(webSocketClient);
        stompClient.setMessageConverter(new StringMessageConverter());
        return stompClient.connect(url, new StompSessionHandlerAdapter() {});
    }
}
