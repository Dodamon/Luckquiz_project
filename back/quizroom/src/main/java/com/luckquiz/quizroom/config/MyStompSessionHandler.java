package com.luckquiz.quizroom.config;


import org.springframework.messaging.converter.StringMessageConverter;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.client.WebSocketClient;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.messaging.WebSocketStompClient;

import java.io.IOException;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class MyStompSessionHandler extends TextWebSocketHandler {
    private static final long TIMEOUT_DURATION = 900000; // Timeout duration in milliseconds
    private ScheduledExecutorService executorService;
    private WebSocketHandler delegate;
    private WebSocketSession session;

    public MyStompSessionHandler(WebSocketHandler delegate) {
        this.delegate = delegate;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        this.session = session;
        startTimeout();
        delegate.afterConnectionEstablished(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // Handle incoming messages from the client
        // Reset the timeout on each received message
        resetTimeout();
//        delegate.handleTextMessage(session, message);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        stopTimeout();
        delegate.afterConnectionClosed(session, status);
    }

    private void startTimeout() {
        executorService = Executors.newSingleThreadScheduledExecutor();
        executorService.schedule(this::disconnectSession, TIMEOUT_DURATION, TimeUnit.MILLISECONDS);
    }

    private void resetTimeout() {
        executorService.shutdownNow();
        startTimeout();
    }

    private void stopTimeout() {
        if (executorService != null) {
            executorService.shutdownNow();
        }
    }

    private void disconnectSession() {
        if (session.isOpen()) {
            try {
                session.close();
            } catch (IOException e) {
                // Handle the exception
            }
        }
    }
}
