package com.luckquiz.quizRoom.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketBrokerConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker (MessageBrokerRegistry registry) {  // 메시지 브로커 설정
        registry.enableSimpleBroker( "/queue","/topic");  // topic은 주로 일대다 여기다 받는걸 해두면 된다.
        // 내장 브로커 사용
        // 파라미터로 설정된 값으로 prefix가 붙은 메시지를 발행 시 브로커가 처리하겠다.
        registry.setApplicationDestinationPrefixes("/app");  // 로 가면 app 이 붙은 애를 처리하는 애한테 간다.
        // 메시지 핸들러로 라우팅되는 prefix
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*") // web socket hand shake 를 위한
                .withSockJS();
    }
}