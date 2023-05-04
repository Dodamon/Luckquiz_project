package com.luckquiz.quizroom.api.controller;


import com.google.gson.Gson;
import com.luckquiz.quizroom.api.request.Grade;
import com.luckquiz.quizroom.api.service.SubmitProducerService;
import com.luckquiz.quizroom.model.QuizMessage;
import com.luckquiz.quizroom.model.SessionContext;
import com.luckquiz.quizroom.model.SessionUsers;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MessageController {
    private final SimpMessageSendingOperations sendingOperations;
    private final Map<String, SessionContext> sessionContextMap = new ConcurrentHashMap<>();
    private  final StringRedisTemplate stringRedisTemplate;
    private final Gson gson;
    private final SubmitProducerService submitProducerService;

    @MessageMapping("/enter")
    public void enter(QuizMessage message) {
        Grade grade = new Grade();
        HashOperations<String, String, String> hashOperations = stringRedisTemplate.opsForHash();
        ZSetOperations<String, String> zSetOperations = stringRedisTemplate.opsForZSet();
        System.out.println(message.getType());
        if (QuizMessage.MessageType.ENTER.equals(message.getType())) {
            String roomId = message.getRoomId();
            message.setMessage(message.getSender() + "님이 입장하였습니다.");
            grade.setPlayerName(message.getSender());
            grade.setPlayerImg(message.getImg());
            hashOperations.put(roomId+"p", message.getSender(), gson.toJson(grade));

            zSetOperations.add(roomId+"rank",message.getSender(),30d);
        }
        Map all = hashOperations.entries(message.getRoomId()+"p");


        sendingOperations.convertAndSend("/topic/quiz/" + message.getRoomId(), message.getMessage());
        sendingOperations.convertAndSend("/topic/quiz/" + message.getRoomId(),all);
    }

    @MessageMapping("/submit")
    public void submit(QuizMessage message) {
        System.out.println(message.getType());
        if (QuizMessage.MessageType.SUBMIT.equals(message.getType())) {
            submitProducerService.clientSubmit(gson.toJson(message));
            System.out.println("제출되었읍니다....");
        }
    }

    @MessageMapping("/quiz/private/{sender}")
    // 각각의 사용자에게 채점 결과를 보내주는 메소드
    public void quizSpread(@Payload QuizMessage message, @DestinationVariable String sender, Principal principal) {
        // 메시지를 수신자에게 전송
        sendingOperations.convertAndSendToUser(sender, "/queue/private", message);
    }
    @MessageMapping("/quiz/start")
    public void start(QuizMessage message) {
        //세션 시작시 정보 할당해주기
        SessionContext sessionContext = new SessionContext();
        sessionContext.setSessionId(message.getRoomId());
        sessionContext.setQuiz_num(0);
        sessionContextMap.put(message.getRoomId(), sessionContext);
    }

    @MessageMapping("/quiz/next")
    public void next(QuizMessage message) {
        //퀴즈 다음페이지 넘기기.
        SessionContext sessionContext = sessionContextMap.get(message.getRoomId());
        sessionContext.setQuiz_num(sessionContext.getQuiz_num() + 1);
    }

    //    @MessageMapping("/quiz/submit")
//    public void submit(QuizMessage message){
//        SessionContext sessionContext = sessionContextMap.get(message.getRoomId());
//        submitProducerService.producerTest(message.getMessage());
//
//    }
    @MessageMapping("/quiz/finish")
    public void finish(QuizMessage message) {
//        세션 끝내면 저장한것도 삭제
        sessionContextMap.remove(message.getRoomId());
    }

}