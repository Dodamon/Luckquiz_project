package com.luckquiz.quizroom.api.controller;


import com.google.gson.Gson;
import com.luckquiz.quizroom.api.request.Grade;
import com.luckquiz.quizroom.api.request.QuizStartRequest;
import com.luckquiz.quizroom.api.response.QGame;
import com.luckquiz.quizroom.api.service.QuizService;
import com.luckquiz.quizroom.api.service.ToGradeProducer;
import com.luckquiz.quizroom.model.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.streams.processor.To;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MessageController {
    private final SimpMessageSendingOperations sendingOperations;
    private  final StringRedisTemplate stringRedisTemplate;
    private final Gson gson;
    private final ToGradeProducer toGradeProducer;

    private final QuizService quizService;

    @MessageMapping("/enter")
    public void enter(QuizMessage message) {
        Grade grade = new Grade();
        HashOperations<String, String, String> hashOperations = stringRedisTemplate.opsForHash();
        ZSetOperations<String, String> zSetOperations = stringRedisTemplate.opsForZSet();
        System.out.println("entered:  "+message.getType()+", sender:    "+message.getSender());
        if ("enter".equals(message.getType())) {
            int roomId = message.getRoomId();
            message.setMessage(message.getSender() + "님이 입장하였습니다.");
            grade.setPlayerName(message.getSender());
            grade.setPlayerImg(message.getImg());
            hashOperations.put(roomId+"p", message.getSender(), gson.toJson(grade));
            zSetOperations.add(roomId+"rank",message.getSender(),0);
        }
        Map all = hashOperations.entries(message.getRoomId()+"p");
        List<String> users = new ArrayList<>(all.values());
        List<UserL> userLList = new ArrayList<>();
        for(String user: users){
            Grade a = gson.fromJson(user,Grade.class);
            UserL u = new UserL();
            u.setImg(a.getPlayerImg());
            u.setSender(a.getPlayerName());
            userLList.add(u);
        }

        sendingOperations.convertAndSend("/topic/quiz/" + message.getRoomId(), message.getMessage());
        sendingOperations.convertAndSend("/topic/quiz/" + message.getRoomId(), userLList);
    }

    @MessageMapping("/submit")
    public void submit(QuizMessage message) {
        System.out.println("submited:   "+message.getType()+", sender:    "+message.getSender());
        if ("submit".equals(message.getType())) {
            toGradeProducer.clientSubmit(gson.toJson(message));
            System.out.println("제출되었읍니다....");
        }
    }

    @MessageMapping("/{roomId}/private/{sender}")
    // 각각의 사용자에게 채점 결과를 보내주는 메소드
    public void quizSpread(@Payload QuizMessage message,@DestinationVariable int roomId, @DestinationVariable String sender, Principal principal) {
        // 메시지를 수신자에게 전송
        System.out.println("private here");
        sendingOperations.convertAndSendToUser(sender, "/queue/"+roomId+"/private/", message);
    }
    // 퀴즈가 시작 요청이 오면 맨 처음 문제를 반환한다.
    // 이 때 quizNum 이 0으로 초기화된다.
    @MessageMapping("/quiz/start")
    public void start(QuizStartRequest quizStartRequest) {
        QGame result = quizService.startQuiz(quizStartRequest);
        sendingOperations.convertAndSend("/topic/quiz/" + quizStartRequest.getRoomId(), result);
    }
    @MessageMapping("/quiz/next")
    public void next(NextMessage nextMessage) {
        QGame result = quizService.nextQuiz(nextMessage);
        sendingOperations.convertAndSend("/topic/quiz/" + nextMessage.getRoomId(), result);
        //퀴즈 다음페이지 넘기기.

    }
    @MessageMapping("/quiz/finish")
    public void finish(QuizMessage message) {
//        세션 끝내면 저장한것도 삭제
    }

    @MessageMapping("/quiz/currentCount")
    public void currentParticipent(CurrentParticipent currentParticipent){
        HashOperations<String, String, String> hashOperations = stringRedisTemplate.opsForHash();
        Map all = hashOperations.entries(currentParticipent.getRoomId()+"p");
        sendingOperations.convertAndSend("/topic/quiz/" + currentParticipent.getRoomId(), all.size());
    }

}