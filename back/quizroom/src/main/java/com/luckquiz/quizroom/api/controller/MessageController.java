package com.luckquiz.quizroom.api.controller;


import com.luckquiz.quizroom.api.service.SubmitProducerService;
import com.luckquiz.quizroom.model.QuizMessage;
import com.luckquiz.quizroom.model.SessionContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MessageController {
    private final SimpMessageSendingOperations sendingOperations;
    private final SubmitProducerService submitProducerService;
    private final Map<String, SessionContext> sessionContextMap = new ConcurrentHashMap<>();

    @MessageMapping("/chat/message")
    public void enter(QuizMessage message) {
        System.out.println(message.getType());
        if (QuizMessage.MessageType.ENTER.equals(message.getType())) {
            message.setMessage(message.getSender()+"님이 입장하였습니다.");
        }
        System.out.println(message.getRoomId());

        sendingOperations.convertAndSend("/topic/quiz/"+message.getRoomId(),message);
    }

    @MessageMapping("/quiz/start")
    public void start(QuizMessage message) {
        //세션 시작시 정보 할당해주기
        SessionContext sessionContext = new SessionContext();
        sessionContext.setSessionId(message.getRoomId());
        sessionContext.setQuiz_num(0);
        sessionContextMap.put(message.getRoomId(),sessionContext);
    }

    @MessageMapping("/quiz/next")
    public void next(QuizMessage message) {
        //퀴즈 다음페이지 넘기기.
        SessionContext sessionContext = sessionContextMap.get(message.getRoomId());
        sessionContext.setQuiz_num(sessionContext.getQuiz_num()+1);
    }

    @MessageMapping("/quiz/submit")
    public void submit(QuizMessage message){
        SessionContext sessionContext = sessionContextMap.get(message.getRoomId());
        submitProducerService.producerTest(message.getMessage());

    }
    @MessageMapping("/quiz/finish")
    public void finish(QuizMessage message) {
//        세션 끝내면 저장한것도 삭제
        sessionContextMap.remove(message.getRoomId());
    }

}