package com.luckquiz.quizRoom.api.controller;

import com.luckquiz.quizRoom.api.request.Message;
import com.luckquiz.quizRoom.api.request.QuizMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class QuizController {
    private final SimpMessageSendingOperations simpMessageSendingOperations;
    @MessageMapping("/quiz/message")  // 초기 업데이터
    public void message(Message message) {
        if(QuizMessage.MessageType.ENTER.equals(message.getType())){
            message.setMessage(message.getSender()+"님께서 입장하셨습니다.");
        }
        simpMessageSendingOperations.convertAndSend("/topic/quiz/room/" + message.getRoomId(), message);
    }
}
