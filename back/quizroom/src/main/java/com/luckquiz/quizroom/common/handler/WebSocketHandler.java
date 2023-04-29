
package com.luckquiz.quizRoom.common.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.luckquiz.quizRoom.api.request.QuizMessage;
import com.luckquiz.quizRoom.api.response.QuizRoom;
import com.luckquiz.quizRoom.api.service.QuizRoomSocketService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
@Slf4j
@RequiredArgsConstructor
@Component
public class WebSocketHandler extends TextWebSocketHandler {
    private final ObjectMapper objectMapper;
    private final QuizRoomSocketService quizRoomSocketService;
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {


        String payload = message.getPayload();
        log.info("1# payload {}",payload);

        QuizMessage quizMessage =objectMapper.readValue(payload, QuizMessage.class);
        QuizRoom room = quizRoomSocketService.findQuizRoomById(quizMessage.getRoomId());

    }


}